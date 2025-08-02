<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

try {
    $pdo = new PDO("mysql:host=localhost;dbname=guestbookdb;charset=utf8", "root", "");
    $stmt = $pdo->query("SELECT name, message FROM guestbook ORDER BY created_at DESC");
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode(["error" => "Lỗi máy chủ: " . $e->getMessage()]);
}
