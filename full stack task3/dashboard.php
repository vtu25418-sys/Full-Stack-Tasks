<?php
session_start();

if(!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h2>Welcome to Dashboard 🎉</h2>
    <a href="logout.php">Logout</a>
</body>
</html>