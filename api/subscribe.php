<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->email)) {
    $email = $conn->real_escape_string($data->email);

    // INSERT IGNORE prevents duplicates
    $sql = "INSERT IGNORE INTO subscribers (email) VALUES ('$email')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Subscribed"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email required"]);
}

$conn->close();
?>