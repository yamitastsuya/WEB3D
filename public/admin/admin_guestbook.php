<?php
session_start();
if (!($_SESSION['admin'] ?? false)) {
    header("Location: login.php");
    exit;
}

$pdo = new PDO("mysql:host=localhost;dbname=guestbookdb;charset=utf8", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Xử lý xoá
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $pdo->prepare("DELETE FROM guestbook WHERE id = ?")->execute([$id]);
    header("Location: admin_guestbook.php");
    exit;
}

// Lọc theo tên nếu có
$keyword = trim($_GET['q'] ?? '');
if ($keyword !== '') {
    $stmt = $pdo->prepare("SELECT * FROM guestbook WHERE name LIKE :kw ORDER BY created_at DESC");
    $stmt->execute(['kw' => "%$keyword%"]);
} else {
    $stmt = $pdo->query("SELECT * FROM guestbook ORDER BY created_at DESC");
}
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Quản lý Sổ Lưu Niệm</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-800 p-8 font-sans">
    <h1 class="text-2xl font-bold mb-6 text-blue-800">Quản lý Sổ Lưu Niệm</h1>

    <div class="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 mb-6">
        <div class="space-x-4">
            <a href="admin.php" class="font-medium text-sm text-gray-700 hover:text-blue-600 transition">
                Quản lý ChatBot
            </a>
            <a href="admin_guestbook.php" class="font-medium text-sm text-blue-700 underline">
                Quản lý Guestbook
            </a>
        </div>
        <a href="logout.php" class="text-red-500 hover:text-red-700 text-sm font-medium transition">Đăng xuất</a>
    </div>

    <form method="GET" class="mb-4 flex gap-2">
        <input type="text" name="q" value="<?= htmlspecialchars($keyword) ?>"
               placeholder="Tìm theo tên..." class="border px-3 py-1 rounded w-1/3">
        <button class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Tìm</button>
    </form>

    <table class="w-full border-collapse border border-gray-300 bg-white shadow-sm text-sm">
        <thead>
            <tr class="bg-gray-200 text-left">
                <th class="border px-3 py-2">ID</th>
                <th class="border px-3 py-2">Họ tên</th>
                <th class="border px-3 py-2">Lời chúc</th>
                <th class="border px-3 py-2">Ngày gửi</th>
                <th class="border px-3 py-2">Thao tác</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($rows as $row): ?>
            <tr>
                <td class="border px-3 py-2"><?= $row['id'] ?></td>
                <td class="border px-3 py-2"><?= htmlspecialchars($row['name']) ?></td>
                <td class="border px-3 py-2"><?= nl2br(htmlspecialchars($row['message'])) ?></td>
                <td class="border px-3 py-2"><?= $row['created_at'] ?></td>
                <td class="border px-3 py-2">
                    <a href="?delete=<?= $row['id'] ?>"
                       onclick="return confirm('Xoá lời chúc này?')"
                       class="text-red-600 hover:text-red-800">🗑 Xoá</a>
                </td>
            </tr>
        <?php endforeach ?>
        </tbody>
    </table>
</body>
</html>
