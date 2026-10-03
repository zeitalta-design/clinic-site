<?php
/**
 * お知らせの管理API（旧 app/api/admin/news/route.ts と [id]/route.ts）
 *   GET    /api/admin/news        一覧（非公開も含む・投稿日時の新しい順）
 *   POST   /api/admin/news        追加
 *   PUT    /api/admin/news/{id}   更新
 *   DELETE /api/admin/news/{id}   削除
 * /api/admin/news/{id} は public/.htaccess で news.php?id={id} に振り替えている。
 */
require __DIR__ . '/_lib.php';

require_auth();

const TABLE = 'clinic_news';
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (string)$_GET['id'] : null;

if ($id !== null && !preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $id)) {
    json_out(['error' => '不正なIDです'], 400);
}

if ($id === null && $method === 'GET') {
    [$status, $rows] = supabase_request('GET', TABLE . '?select=*&order=created_at.desc');
    if ($status !== 200 || !is_array($rows)) {
        error_log('[admin-api] 一覧取得に失敗: ' . $status);
        json_out([]); // 旧版と同じく、失敗時は空の一覧
    }
    json_out(array_map('map_row', $rows));
}

if ($id === null && $method === 'POST') {
    $data = read_json_body();
    $title = trim((string)($data['title'] ?? ''));
    $date = trim((string)($data['date'] ?? ''));
    if ($title === '') json_out(['error' => 'タイトルは必須です'], 400);
    if ($date === '') json_out(['error' => '日付は必須です'], 400);
    $content = trim((string)($data['content'] ?? ''));
    [$status, $rows] = supabase_request('POST', TABLE . '?select=*', [
        'title' => $title,
        'date' => $date,
        'body' => $content === '' ? null : $content,
        'published' => array_key_exists('is_published', $data) ? (bool)$data['is_published'] : true,
    ]);
    if ($status !== 201 || !is_array($rows) || !isset($rows[0])) {
        json_out(['error' => supabase_error_message($rows, 'サーバーエラー')], 500);
    }
    json_out(map_row($rows[0]), 201);
}

if ($id !== null && $method === 'PUT') {
    $data = read_json_body();
    $updates = [];
    if (array_key_exists('title', $data)) $updates['title'] = $data['title'];
    if (array_key_exists('date', $data)) $updates['date'] = $data['date'];
    if (array_key_exists('content', $data)) $updates['body'] = $data['content'];
    if (array_key_exists('is_published', $data)) $updates['published'] = (bool)$data['is_published'];
    [$status, $rows] = supabase_request('PATCH', TABLE . '?id=eq.' . $id . '&select=*', $updates);
    if ($status !== 200) json_out(['error' => supabase_error_message($rows, 'サーバーエラー')], 500);
    if (!is_array($rows) || !isset($rows[0])) json_out(['error' => '更新に失敗しました'], 404);
    json_out(map_row($rows[0]));
}

if ($id !== null && $method === 'DELETE') {
    [$status, $rows] = supabase_request('DELETE', TABLE . '?id=eq.' . $id);
    if ($status < 200 || $status >= 300) json_out(['error' => '削除に失敗しました'], 404);
    json_out(['ok' => true]);
}

json_out(['error' => 'Method Not Allowed'], 405);
