<?php
header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO("mysql:host=localhost;dbname=chatboxdhv;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    $msg = trim($data['message'] ?? '');

    if ($msg === '') {
        http_response_code(400);
        echo json_encode(['reply' => 'Vui lòng nhập nội dung!']);
        exit;
    }

    function normalize($str) {
        $str = mb_strtolower($str, 'UTF-8');
        $str = preg_replace('/[^\p{L}\p{N}\s]/u', '', $str);
        $str = preg_replace('/\s+/', ' ', $str);
        return trim($str);
    }

    //  Nếu người dùng đang dạy bot bằng ngôn ngữ tự nhiên
    if (
             preg_match('/nếu.*?(?:ai hỏi|ai bảo|ai nói|)\s+(.+?)\s+(?:thì trả lời|chỉnh lại thành|hãy trả lời|trả lời)\s+["“]?(.+?)["”]?$/iu', $msg, $matches) ||
            preg_match('/sửa lại:\s*(.+?)\s*=>\s*(.+)/iu', $msg, $matches) ||
            preg_match('/chỉnh\s+"(.+?)"\s+thành\s+"(.+?)"/iu', $msg, $matches) ||
            preg_match('/nếu.*?ai nói\s+(.+?)\s+h(?:ã|a)y\s+trả\s+lời\s+(.+)/iu', $msg, $matches)
    ) {
        $question = trim($matches[1]);
        $answer = trim($matches[2]);
        $norm = normalize($question);

        $check = $pdo->prepare("SELECT id FROM bot_qa WHERE question_norm = ?");
        $check->execute([$norm]);

        if ($check->fetch()) {
            $update = $pdo->prepare("UPDATE bot_qa SET answer = ?, question = ? WHERE question_norm = ?");
            $update->execute([$answer, $question, $norm]);
            echo json_encode(['reply' => 'Đã cập nhật phản hồi.'], JSON_UNESCAPED_UNICODE);
        } else {
            $insert = $pdo->prepare("INSERT INTO bot_qa (question, question_norm, answer) VALUES (?, ?, ?)");
            $insert->execute([$question, $norm, $answer]);
            echo json_encode(['reply' => 'Đã học thêm điều mới! nice =)))'], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }

    // Chuẩn hóa input
    $norm = normalize($msg);

    // 1. Tìm chính xác
    $stmt = $pdo->prepare("SELECT answer FROM bot_qa WHERE question_norm = ? LIMIT 1");
    $stmt->execute([$norm]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. LIKE nếu chưa có
    if (!$row) {
        $stmt = $pdo->prepare("SELECT answer FROM bot_qa WHERE question_norm LIKE ? LIMIT 1");
        $stmt->execute(["%$norm%"]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    if ($row) {
        echo json_encode(['reply' => $row['answer']], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['reply' => 'Xin lỗi, mình chưa có câu trả lời phù hợp. Bạn vui lòng liên hệ phòng đào tạo để biết thêm chi tiết.'], JSON_UNESCAPED_UNICODE);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['reply' => 'Lỗi máy chủ: ' . $e->getMessage()]);
}