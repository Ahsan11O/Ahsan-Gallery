<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $dir = "users/$username";

    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
        echo "User folder created!";
    } else {
        echo "Folder already exists.";
    }
}
?>
