<?php
session_start();
include "db.php";

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if($stmt->num_rows > 0) {
    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    if(password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>