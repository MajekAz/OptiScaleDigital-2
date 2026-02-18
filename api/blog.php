<?php
include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];
$key = $_GET['key'] ?? '';

// Allow GET for public blog viewing, protect everything else
if ($method !== 'GET' && $key !== 'secret123') {
    http_response_code(403);
    die(json_encode(["error" => "Forbidden"]));
}

switch($method) {
    case 'GET':
        $sql = "SELECT * FROM blog_posts ";
        if ($key !== 'secret123') {
            $sql .= "WHERE (status = 'published') OR (status = 'scheduled' AND scheduled_at <= NOW()) ";
        }
        $sql .= "ORDER BY created_at DESC";
        
        $res = $conn->query($sql);
        $posts = [];
        while($row = $res->fetch_assoc()) { $posts[] = $row; }
        echo json_encode($posts);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $scheduled_at = ($data->status === 'scheduled' && !empty($data->scheduled_at)) ? str_replace('T', ' ', $data->scheduled_at) : null;
        
        $stmt = $conn->prepare("INSERT INTO blog_posts (title, excerpt, content, author, category, created_at, image, status, scheduled_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $data->title, $data->excerpt, $data->content, $data->author, $data->category, $data->date, $data->image, $data->status, $scheduled_at);
        $stmt->execute();
        echo json_encode(["success" => true, "id" => $conn->insert_id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $scheduled_at = ($data->status === 'scheduled' && !empty($data->scheduled_at)) ? str_replace('T', ' ', $data->scheduled_at) : null;

        $stmt = $conn->prepare("UPDATE blog_posts SET title=?, excerpt=?, content=?, author=?, category=?, created_at=?, image=?, status=?, scheduled_at=? WHERE id=?");
        $stmt->bind_param("sssssssssi", $data->title, $data->excerpt, $data->content, $data->author, $data->category, $data->date, $data->image, $data->status, $scheduled_at, $data->id);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if($id) {
            $conn->query("DELETE FROM blog_posts WHERE id = " . intval($id));
            echo json_encode(["success" => true]);
        }
        break;
}

$conn->close();
?>