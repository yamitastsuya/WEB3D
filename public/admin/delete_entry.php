<?php
session_start();
if (!($_SESSION['admin'] ?? false)) {
    die("Unauthorized");
}

$pdo = new PDO("mysql:host=localhost;dbname=chatboxdhv;charset=utf8", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id = intval($_GET['id'] ?? 0);
if ($id) {
    $pdo->prepare("DELETE FROM bot_qa WHERE id = ?")->execute([$id]);
}

header("Location: admin.php");
