<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->email) && isset($data->date) && isset($data->time)) {
    $name = $conn->real_escape_string($data->name);
    $email = $conn->real_escape_string($data->email);
    $service = $conn->real_escape_string($data->service);
    $b_date = $conn->real_escape_string($data->date);
    $b_time = $conn->real_escape_string($data->time);

    $sql = "INSERT INTO bookings (name, email, service, booking_date, booking_time) 
            VALUES ('$name', '$email', '$service', '$b_date', '$b_time')";

    if ($conn->query($sql) === TRUE) {
        // Email Notification
        $to = "info@optiscaledigital.co.uk";
        $subject = "New Consultation Booking: $name";
        $body = "Client: $name\nEmail: $email\nTopic: $service\nDate: $b_date\nTime: $b_time";
        mail($to, $subject, $body);

        echo json_encode(["success" => true, "message" => "Booking confirmed"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error processing booking"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing booking details"]);
}

$conn->close();
?>