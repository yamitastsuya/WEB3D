<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Chỉ chấp nhận phương thức POST']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=guestbookdb;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data['name'] ?? '');
    $message = trim($data['message'] ?? '');

    if ($name === '' || $message === '') {
        echo json_encode(['error' => 'Vui lòng điền đầy đủ tên và lời chúc!']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO guestbook (name, message) VALUES (?, ?)");
    $stmt->execute([$name, $message]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi máy chủ: ' . $e->getMessage()]);
}
