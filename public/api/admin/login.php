<?php
// POST /api/admin/login  { user, password } → Cookie admin_session を発行（旧 app/api/admin/login/route.ts）
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'Method Not Allowed'], 405);

$cfg = config();
$data = read_json_body();
$user = is_string($data['user'] ?? null) ? $data['user'] : '';
$password = is_string($data['password'] ?? null) ? $data['password'] : '';

if (!hash_equals($cfg['ADMIN_USER'], $user) || !hash_equals($cfg['ADMIN_PASSWORD'], $password)) {
    json_out(['error' => 'ユーザー名またはパスワードが正しくありません'], 401);
}

set_session_cookie(create_session_token(), 7 * 24 * 60 * 60);
json_out(['ok' => true]);
