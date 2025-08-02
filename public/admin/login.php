<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if ($username === 'yami' && $password === '123456') {
        $_SESSION['admin'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $error = 'Sai tài khoản hoặc mật khẩu!';
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><title>Đăng nhập</title></head>
<body>
    <h2>🔐 Đăng nhập quản trị</h2>
    <?php if (!empty($error)) echo "<p style='color:red'>$error</p>"; ?>
    <form method="POST">
        <input name="username" placeholder="Tài khoản"><br><br>
        <input name="password" type="password" placeholder="Mật khẩu"><br><br>
        <button type="submit">Đăng nhập</button>
    </form>
</body>
</html>
