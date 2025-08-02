<?php
// normalize_questions.php

function normalize($str) {
    $str = mb_strtolower($str, 'UTF-8');
    $str = preg_replace('/[^\p{L}\p{N}\s]/u', '', $str); // bỏ ký tự đặc biệt
    $str = preg_replace('/\s+/', ' ', $str); // gộp khoảng trắng
    return trim($str);
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=chatboxdhv;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $rows = $pdo->query("SELECT id, question FROM bot_qa")->fetchAll(PDO::FETCH_ASSOC);

    $count = 0;
    foreach ($rows as $row) {
        $id = $row['id'];
        $normalized = normalize($row['question']);

        $stmt = $pdo->prepare("UPDATE bot_qa SET question_norm = ? WHERE id = ?");
        $stmt->execute([$normalized, $id]);
        $count++;
    }

    echo "Đã chuẩn hóa $count dòng thành công.";
} catch (PDOException $e) {
    echo "❌ Lỗi: " . $e->getMessage();
}
