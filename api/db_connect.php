<?php
/**
 * OptiScale Digital - Database Connection
 * Replace placeholders with your Hostinger MySQL credentials.
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// --- UPDATE THESE DETAILS FROM HOSTINGER hPANEL ---
$host = "localhost";
$user = "DB_USER_HERE";     // e.g., u123456789_user
$pass = "DB_PASSWORD_HERE"; // e.g., YourSecretPassword123!
$db   = "DB_NAME_HERE";     // e.g., u123456789_optiscale
// --------------------------------------------------

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database Connection Failed: " . $conn->connect_error]);
    exit;
}
?>