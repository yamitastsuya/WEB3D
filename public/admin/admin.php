<?php
session_start();
if (!($_SESSION['admin'] ?? false)) {
    header("Location: login.php");
    exit;
}

$pdo = new PDO("mysql:host=localhost;dbname=chatboxdhv;charset=utf8", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Xử lý xoá
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $pdo->prepare("DELETE FROM bot_qa WHERE id = ?")->execute([$id]);
    header("Location: admin.php");
    exit;
}

// Xử lý chỉnh sửa
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit_id'])) {
    $id = intval($_POST['edit_id']);
    $question = trim($_POST['question']);
    $answer = trim($_POST['answer']);
    $norm = normalize($question);

    $stmt = $pdo->prepare("UPDATE bot_qa SET question = ?, answer = ?, question_norm = ? WHERE id = ?");
    $stmt->execute([$question, $answer, $norm, $id]);
}

// Chuẩn hoá function
function normalize($str) {
    $str = mb_strtolower($str, 'UTF-8');
    $str = preg_replace('/[^\p{L}\p{N}\s]/u', '', $str);
    $str = preg_replace('/\s+/', ' ', $str);
    return trim($str);
}

// Lọc
$keyword = trim($_GET['q'] ?? '');
$field = $_GET['field'] ?? 'all';

if ($keyword !== '') {
    if ($field === 'question') {
        $stmt = $pdo->prepare("SELECT * FROM bot_qa WHERE question LIKE :kw ORDER BY id DESC");
    } elseif ($field === 'answer') {
        $stmt = $pdo->prepare("SELECT * FROM bot_qa WHERE answer LIKE :kw ORDER BY id DESC");
    } else {
        $stmt = $pdo->prepare("SELECT * FROM bot_qa WHERE question LIKE :kw OR answer LIKE :kw ORDER BY id DESC");
    }
    $stmt->execute(['kw' => "%$keyword%"]);
} else {
    $stmt = $pdo->query("SELECT * FROM bot_qa ORDER BY id DESC");
}
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Quản trị ChatBot DHV</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 1rem }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #333; color: white; }
        td textarea { width: 100%; }
        .actions a { margin-right: 8px; color: red; text-decoration: none; }
        .topnav {
            margin-bottom: 1rem;
            background: #f0f0f0;
            padding: 10px;
            border-radius: 6px;
        }
        .topnav a {
            margin-right: 16px;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Quản lý dữ liệu ChatBot</h1>

    <div class="topnav">
        🔄 Chuyển đến:
        <a href="admin.php" style="color: #000;">ChatBot</a>
        <a href="admin_guestbook.php" style="color: #0056cc;">Guestbook</a>
        <a href="logout.php" style="float:right; color: red;">Đăng xuất</a>
    </div>

    <form method="GET" style="margin-bottom: 1rem;">
        <input type="text" name="q" value="<?= htmlspecialchars($keyword) ?>" placeholder="Tìm kiếm...">
        <select name="field">
            <option value="all" <?= $field === 'all' ? 'selected' : '' ?>>Tất cả</option>
            <option value="question" <?= $field === 'question' ? 'selected' : '' ?>>Chỉ câu hỏi</option>
            <option value="answer" <?= $field === 'answer' ? 'selected' : '' ?>>Chỉ trả lời</option>
        </select>
        <button>Tìm</button>
    </form>

    <table>
        <tr>
            <th>ID</th>
            <th>Câu hỏi</th>
            <th>Trả lời</th>
            <th>Thao tác</th>
        </tr>
        <?php foreach ($rows as $row): ?>
            <tr>
                <form method="POST">
                    <input type="hidden" name="edit_id" value="<?= $row['id'] ?>">
                    <td><?= $row['id'] ?></td>
                    <td><textarea name="question"><?= htmlspecialchars($row['question']) ?></textarea></td>
                    <td><textarea name="answer"><?= htmlspecialchars($row['answer']) ?></textarea></td>
                    <td class="actions">
                        <button type="submit">💾 Lưu</button>
                        <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Xoá dòng này?')">🗑 Xoá</a>
                    </td>
                </form>
            </tr>
        <?php endforeach ?>
    </table>
</body>
</html>
