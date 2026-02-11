# OptiScale Digital - Hostinger Deployment Guide

To make your application work on Hostinger Shared Hosting and visualize data, follow these steps.

## Overview

1.  **Frontend:** The React application runs in the browser and sends data to the PHP backend via `fetch` requests to the `/api` directory.
2.  **Backend:** PHP scripts handle data reception, store it in a MySQL database, and **send email notifications**.

---

## Step 1: Create the Database (Hostinger hPanel)

1.  Log in to **Hostinger hPanel**.
2.  Go to **Databases** > **Management**.
3.  Create a new MySQL Database.
    *   **Database Name:** e.g., `u123456789_optiscale`
    *   **Username:** e.g., `u123456789_admin`
    *   **Password:** (Create a strong password and save it)
4.  Click **Enter phpMyAdmin**.
5.  Click the **SQL** tab and paste the following code to create your tables (Contact, Booking, and **Blog Posts**), then click **Go**:

```sql
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100),
    booking_date DATE NOT NULL,
    booking_time VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    author VARCHAR(100),
    category VARCHAR(50),
    created_at DATE NOT NULL
);
```

---

## Step 2: Build the React App

In your local terminal (project root), run:

```bash
npm run build
```

This creates a `dist` (or `build`) folder containing `index.html`, `assets/`, etc. These are the files you will upload to the server.

---

## Step 3: Create Backend Files

Create a folder named `api` on your computer. Inside it, create the following 5 PHP files. 

### 1. `db_connect.php`

*Replace the values with your actual Hostinger database credentials.*

```php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$host = "localhost";
$username = "u123456789_admin"; // YOUR HOSTINGER USERNAME
$password = "YourStrongPassword"; // YOUR HOSTINGER PASSWORD
$dbname = "u123456789_optiscale"; // YOUR HOSTINGER DB NAME

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database Connection Failed"]));
}
?>
```

### 2. `contact.php`

```php
<?php
include 'db_connect.php';
$data = json_decode(file_get_contents("php://input"));

if($data) {
    // 1. Save to Database
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, service, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data->name, $data->email, $data->service, $data->message);
    $saved = $stmt->execute();
    $stmt->close();
    
    // 2. Send Email Notification
    if ($saved) {
        $to = "info@optiscaledigital.co.uk";
        $subject = "New Website Inquiry: " . $data->name;
        $body = "Name: " . $data->name . "\n" .
                "Email: " . $data->email . "\n" .
                "Service: " . $data->service . "\n\n" .
                "Message:\n" . $data->message;
        
        $headers = "From: noreply@optiscaledigital.co.uk"; 

        mail($to, $subject, $body, $headers);

        echo json_encode(["success" => true, "message" => "Message sent"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error saving data"]);
    }
}
$conn->close();
?>
```

### 3. `booking.php`

```php
<?php
include 'db_connect.php';
$data = json_decode(file_get_contents("php://input"));

if($data) {
    // 1. Save to Database
    $stmt = $conn->prepare("INSERT INTO bookings (name, email, service, booking_date, booking_time) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $data->name, $data->email, $data->service, $data->date, $data->time);
    $saved = $stmt->execute();
    $stmt->close();
    
    // 2. Send Email Notification
    if ($saved) {
        $to = "info@optiscaledigital.co.uk";
        $subject = "New Booking Request: " . $data->name;
        $body = "Name: " . $data->name . "\n" .
                "Email: " . $data->email . "\n" .
                "Service: " . $data->service . "\n" .
                "Date: " . $data->date . "\n" .
                "Time: " . $data->time;
        
        $headers = "From: noreply@optiscaledigital.co.uk";

        mail($to, $subject, $body, $headers);

        echo json_encode(["success" => true, "message" => "Booking confirmed"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error saving booking"]);
    }
}
$conn->close();
?>
```

### 4. `blog.php` (New: Handles CRUD for Admin)

```php
<?php
include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];
$key = isset($_GET['key']) ? $_GET['key'] : '';
$adminKey = 'secret123'; // CHANGE THIS TO YOUR STRONG PASSWORD

// Handle Preflight for React
if ($method == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// GET: Fetch posts (Public or Admin)
if ($method == 'GET') {
    $sql = "SELECT * FROM blog_posts ORDER BY created_at DESC";
    $result = $conn->query($sql);
    $posts = [];
    while($row = $result->fetch_assoc()) {
        $row['date'] = $row['created_at']; // Alias for frontend
        $posts[] = $row;
    }
    echo json_encode($posts);
    exit;
}

// SECURITY CHECK FOR WRITE OPERATIONS
if ($key != $adminKey) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Access Denied"]);
    exit;
}

// READ INPUT JSON
$data = json_decode(file_get_contents("php://input"));

// POST: Create New Post
if ($method == 'POST') {
    $stmt = $conn->prepare("INSERT INTO blog_posts (title, excerpt, content, author, category, created_at) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $data->title, $data->excerpt, $data->content, $data->author, $data->category, $data->date);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Post Created"]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
}

// PUT: Update Existing Post
if ($method == 'PUT') {
    $stmt = $conn->prepare("UPDATE blog_posts SET title=?, excerpt=?, content=?, author=?, category=?, created_at=? WHERE id=?");
    $stmt->bind_param("ssssssi", $data->title, $data->excerpt, $data->content, $data->author, $data->category, $data->date, $data->id);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Post Updated"]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
}

// DELETE: Delete Post
if ($method == 'DELETE') {
    $id = $_GET['id'];
    if($id) {
        $stmt = $conn->prepare("DELETE FROM blog_posts WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Post Deleted"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting"]);
        }
    }
}

$conn->close();
?>
```

### 5. `view_data.php` (Admin Dashboard for Leads)

```php
<?php
if (!isset($_GET['key']) || $_GET['key'] != 'secret123') { die("Access Denied"); }
include 'db_connect.php';
$contacts = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC");
$bookings = $conn->query("SELECT * FROM bookings ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html>
<head><title>Admin</title><style>body{font-family:sans-serif;padding:20px}table{border-collapse:collapse;width:100%;margin-bottom:20px}th,td{border:1px solid #ddd;padding:8px}</style></head>
<body>
    <h1>Leads Dashboard</h1>
    <h2>Bookings</h2>
    <table><tr><th>Name</th><th>Email</th><th>Date</th></tr>
    <?php while($row = $bookings->fetch_assoc()): ?><tr><td><?=$row['name']?></td><td><?=$row['email']?></td><td><?=$row['booking_date']?></td></tr><?php endwhile; ?>
    </table>
    <h2>Messages</h2>
    <table><tr><th>Name</th><th>Message</th></tr>
    <?php while($row = $contacts->fetch_assoc()): ?><tr><td><?=$row['name']?></td><td><?=$row['message']?></td></tr><?php endwhile; ?>
    </table>
</body>
</html>
```

---

## Step 4: Upload to Hostinger

1.  **Access File Manager:**
    *   Log in to **Hostinger hPanel**.
    *   Click on **Files** > **File Manager**.
    *   Select **Access files of [your domain]**.

2.  **Prepare the Public Directory:**
    *   Double-click to open the `public_html` folder.

3.  **Upload Frontend (React App):**
    *   Drag and drop `dist` files (index.html, etc) into `public_html`.

4.  **Upload Backend (PHP Files):**
    *   Inside `public_html`, ensure you have the `api` folder.
    *   Upload/Create: `db_connect.php`, `contact.php`, `booking.php`, `blog.php`, `view_data.php`.

---

## Step 5: Access Admin Dashboard

1.  Navigate to `https://yourdomain.com/#/admin`
2.  Enter your secret key (Default: `secret123`) to manage blog posts.
