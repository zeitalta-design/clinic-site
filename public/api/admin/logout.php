<?php
// POST /api/admin/logout → Cookie を削除（旧 app/api/admin/logout/route.ts）
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'Method Not Allowed'], 405);

set_session_cookie('', 0);
json_out(['ok' => true]);
