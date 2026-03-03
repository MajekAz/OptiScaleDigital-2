<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded', 'debug' => $_FILES]);
    exit;
}

$file = $_FILES['image'];
$uploadDir = '../public/uploads/';

if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create upload directory']);
        exit;
    }
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = time() . '-' . uniqid() . '.' . $ext;
$targetFile = $uploadDir . $fileName;

if (move_uploaded_file($file['tmp_name'], $targetFile)) {
    echo json_encode([
        'success' => true,
        'url' => '/uploads/' . $fileName,
        'name' => $file['name']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded file', 'tmp' => $file['tmp_name'], 'target' => $targetFile]);
}
?>
