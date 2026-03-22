<?php
include "db.php";

$email = "admin@gmail.com";
$plain_password = "123456";

$hashed_password = password_hash($plain_password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $hashed_password);

if ($stmt->execute()) {
    echo "User Created Successfully!";
} else {
    echo "User already exists!";
}

$stmt->close();
$conn->close();
?>