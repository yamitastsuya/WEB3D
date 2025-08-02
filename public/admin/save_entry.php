<?php
session_start();
if (!($_SESSION['admin'] ?? false)) {
    die("Unauthorized");
}

function normalize($str) {
    $str = mb_strtolower($str, 'UTF-8');
    $str = preg_replace('/[^\p{L}\p{N}\s]/u', '', $str);
    $str = preg_replace('/\s+/', ' ', $str);
    return trim($str);
}

$pdo = new PDO("mysql:host=localhost;dbname=chatboxdhv;charset=utf8", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id = intval($_POST['edit_id'] ?? 0);
$question = trim($_POST['question'] ?? '');
$answer = trim($_POST['answer'] ?? '');
$norm = normalize($question);

if ($id && $question && $answer) {
    $stmt = $pdo->prepare("UPDATE bot_qa SET question = ?, answer = ?, question_norm = ? WHERE id = ?");
    $stmt->execute([$question, $answer, $norm, $id]);
}

header("Location: admin.php");
