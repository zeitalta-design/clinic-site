<?php
/**
 * 管理画面API（お知らせ）の共通処理。ロリポップ（PHP）で動く。
 *
 * 旧 Vercel 版（Next.js の app/api/admin/* と lib/auth.ts）と同じ挙動に揃えている:
 *   - ログインは ADMIN_USER / ADMIN_PASSWORD の一致
 *   - セッションは Cookie「admin_session」= "<ミリ秒時刻>.<HMAC-SHA256(時刻, ADMIN_SESSION_SECRET) 先頭32桁>"・7日間有効
 *   - お知らせの読み書きは Supabase REST に秘密キー（SUPABASE_SERVICE_ROLE_KEY）で行う（RLS を通さない）
 *
 * 設定値は _config.php（デプロイ時に GitHub Actions が Secrets から生成・リポジトリには含めない）から読む。
 * 設定が欠けている場合は既定値で動かさず、エラーにする（旧版の "admin"/"admin" 既定値は危険なため廃止）。
 */
declare(strict_types=1);

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function json_out($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function config(): array
{
    static $cfg = null;
    if ($cfg !== null) return $cfg;
    $path = __DIR__ . '/_config.php';
    $loaded = is_file($path) ? require $path : null;
    $keys = ['ADMIN_USER', 'ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
    foreach ($keys as $k) {
        if (!is_array($loaded) || !isset($loaded[$k]) || $loaded[$k] === '') {
            error_log("[admin-api] 設定が不足しています: $k");
            json_out(['error' => 'サーバーの設定に不備があります'], 500);
        }
    }
    return $cfg = $loaded;
}

function session_sig(string $ts): string
{
    return substr(hash_hmac('sha256', $ts, config()['ADMIN_SESSION_SECRET']), 0, 32);
}

function create_session_token(): string
{
    $ts = sprintf('%.0f', floor(microtime(true) * 1000));
    return $ts . '.' . session_sig($ts);
}

function verify_session_token(?string $token): bool
{
    if (!is_string($token) || $token === '') return false;
    $parts = explode('.', $token);
    if (count($parts) !== 2 || !ctype_digit($parts[0])) return false;
    [$ts, $sig] = $parts;
    if (!hash_equals(session_sig($ts), $sig)) return false;
    return (floor(microtime(true) * 1000) - (float)$ts) < SESSION_TTL_MS;
}

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
        || (($_SERVER['SERVER_PORT'] ?? '') === '443');
}

function set_session_cookie(string $value, int $maxAge): void
{
    setcookie('admin_session', $value, [
        'expires' => $maxAge > 0 ? time() + $maxAge : time() - 3600,
        'path' => '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function require_auth(): void
{
    if (!verify_session_token($_COOKIE['admin_session'] ?? null)) {
        json_out(['error' => '認証が必要です'], 401);
    }
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw === false ? '' : $raw, true);
    return is_array($data) ? $data : [];
}

/** Supabase REST を呼ぶ。戻り値 [HTTPステータス, デコード済みJSON] */
function supabase_request(string $method, string $pathAndQuery, ?array $body = null): array
{
    $cfg = config();
    $key = $cfg['SUPABASE_SERVICE_ROLE_KEY'];
    $ch = curl_init(rtrim($cfg['SUPABASE_URL'], '/') . '/rest/v1/' . $pathAndQuery);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => [
            'apikey: ' . $key,
            'Authorization: Bearer ' . $key,
            'Content-Type: application/json',
            'Prefer: return=representation',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_UNICODE));
    }
    $resp = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    if ($resp === false) {
        error_log("[admin-api] Supabase 通信エラー: $err");
        return [0, null];
    }
    return [$status, json_decode($resp, true)];
}

/** DB行 → 管理画面の形（旧 lib/admin-news.ts の mapRow と同じ） */
function map_row(array $r): array
{
    return [
        'id' => $r['id'],
        'title' => $r['title'],
        'date' => $r['date'],
        'content' => $r['body'] ?? null,
        'is_published' => (bool)$r['published'],
        'created_at' => $r['created_at'],
    ];
}

function supabase_error_message($decoded, string $fallback): string
{
    return is_array($decoded) && isset($decoded['message']) ? (string)$decoded['message'] : $fallback;
}
