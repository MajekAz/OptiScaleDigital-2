<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->email) && isset($data->name)) {
    $name = $conn->real_escape_string($data->name);
    $email = $conn->real_escape_string($data->email);
    $service = $conn->real_escape_string($data->service);
    $message = $conn->real_escape_string($data->message);

    $sql = "INSERT INTO contacts (name, email, service, message) VALUES ('$name', '$email', '$service', '$message')";

    if ($conn->query($sql) === TRUE) {
        // Optional: Send Email Notification
        $to = "info@optiscaledigital.co.uk";
        $subject = "New Contact Form Submission: $name";
        $body = "Name: $name\nEmail: $email\nService: $service\n\nMessage:\n$message";
        mail($to, $subject, $body);

        echo json_encode(["success" => true, "message" => "Inquiry received successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error saving data"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}

$conn->close();
?>