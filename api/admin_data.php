<?php
include 'db_connect.php';

$key = $_GET['key'] ?? '';
if ($key !== 'secret123') {
    http_response_code(403);
    die(json_encode(["success" => false, "message" => "Unauthorized"]));
}

$leads = [];

// 1. Fetch Contacts
$res1 = $conn->query("SELECT id, name, email, message, service, created_at FROM contacts ORDER BY created_at DESC");
if ($res1) {
    while ($row = $res1->fetch_assoc()) {
        $row['type'] = 'contact';
        $leads[] = $row;
    }
}

// 2. Fetch Bookings
$res2 = $conn->query("SELECT id, name, email, service, booking_date, booking_time, created_at FROM bookings ORDER BY created_at DESC");
if ($res2) {
    while ($row = $res2->fetch_assoc()) {
        $row['type'] = 'booking';
        $leads[] = $row;
    }
}

// 3. Fetch Subscribers
$res3 = $conn->query("SELECT id, email, subscribed_at as created_at FROM subscribers ORDER BY subscribed_at DESC");
if ($res3) {
    while ($row = $res3->fetch_assoc()) {
        $row['type'] = 'subscriber';
        $row['name'] = 'Newsletter Subscriber';
        $row['service'] = 'Newsletter';
        $leads[] = $row;
    }
}

// Sort all combined results by creation date (newest first)
usort($leads, function($a, $b) {
    return strtotime($b['created_at']) - strtotime($a['created_at']);
});

echo json_encode(["success" => true, "data" => $leads]);
$conn->close();
?>