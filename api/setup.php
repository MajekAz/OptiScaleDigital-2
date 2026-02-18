<?php
/**
 * OptiScale Database Auto-Setup
 */
include 'db_connect.php';

echo "<h1>OptiScale Database Setup</h1>";

$tables = [
    "contacts" => "CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        service VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    "bookings" => "CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        service VARCHAR(100),
        booking_date DATE NOT NULL,
        booking_time VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    "blog_posts" => "CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content LONGTEXT,
        author VARCHAR(100),
        category VARCHAR(50),
        image LONGTEXT,
        status VARCHAR(20) DEFAULT 'published',
        scheduled_at DATETIME NULL,
        created_at DATE NOT NULL
    )",
    "subscribers" => "CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )"
];

foreach ($tables as $name => $sql) {
    if ($conn->query($sql) === TRUE) {
        echo "<p style='color: green;'>✓ Table <b>$name</b> ready.</p>";
    } else {
        echo "<p style='color: red;'>× Error creating $name: " . $conn->error . "</p>";
    }
}

// Check for missing columns (migration support)
$result = $conn->query("SHOW COLUMNS FROM blog_posts LIKE 'status'");
if ($result->num_rows == 0) {
    $conn->query("ALTER TABLE blog_posts ADD COLUMN status VARCHAR(20) DEFAULT 'published'");
    $conn->query("ALTER TABLE blog_posts ADD COLUMN scheduled_at DATETIME NULL");
    echo "<p style='color: orange;'>i Migrated blog_posts table with status and scheduled_at columns.</p>";
}

// Default blog post
$check = $conn->query("SELECT id FROM blog_posts LIMIT 1");
if ($check->num_rows == 0) {
    $title = "The Future of AI in UK Small Business";
    $excerpt = "Leveraging automation in 2024.";
    $content = "<p>Artificial Intelligence is no longer just for tech giants...</p>";
    $author = "OptiScale Team";
    $cat = "AI Automation";
    $img = "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop";
    $date = date('Y-m-d');
    
    $stmt = $conn->prepare("INSERT INTO blog_posts (title, excerpt, content, author, category, created_at, image, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'published')");
    $stmt->bind_param("sssssss", $title, $excerpt, $content, $author, $cat, $date, $img);
    $stmt->execute();
    echo "<p style='color: blue;'>i Default blog post inserted.</p>";
}

echo "<h3>Setup Complete.</h3>";
$conn->close();
?>