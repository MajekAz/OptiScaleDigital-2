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
5.  Click the **SQL** tab and paste the following code to create your tables, then click **Go**:

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

Create a folder named `api` on your computer. Inside it, create the following 4 PHP files. These have been updated to send emails to **info@optiscaledigital.co.uk**.

### 1. `db_connect.php`

*Replace the values with your actual Hostinger database credentials.*

```php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

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

### 2. `contact.php` (Updated with Email Logic)

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
        
        // Use a sender address from your own domain to prevent spam filtering
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

### 3. `booking.php` (Updated with Email Logic)

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

### 4. `view_data.php` (Admin Dashboard)

*Security Note: Change `secret123` to a secure password or key.*

```php
<?php
// SIMPLE SECURITY: Change 'secret123' to a hard password.
if (!isset($_GET['key']) || $_GET['key'] != 'secret123') {
    die("Access Denied");
}

include 'db_connect.php';

$contacts = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC");
$bookings = $conn->query("SELECT * FROM bookings ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html>
<head>
    <title>OptiScale Admin</title>
    <style>
        body { font-family: sans-serif; padding: 20px; background: #f0f2f5; }
        h2 { color: #0047AB; border-bottom: 2px solid #0047AB; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        th, td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
        th { background-color: #f8f9fa; }
    </style>
</head>
<body>
    <h1>Data Dashboard</h1>
    
    <h2>Recent Bookings</h2>
    <table>
        <tr><th>Name</th><th>Email</th><th>Service</th><th>Date</th><th>Time</th><th>Submitted</th></tr>
        <?php while($row = $bookings->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['name']) ?></td>
            <td><?= htmlspecialchars($row['email']) ?></td>
            <td><?= htmlspecialchars($row['service']) ?></td>
            <td><?= htmlspecialchars($row['booking_date']) ?></td>
            <td><?= htmlspecialchars($row['booking_time']) ?></td>
            <td><?= htmlspecialchars($row['created_at']) ?></td>
        </tr>
        <?php endwhile; ?>
    </table>

    <h2>Contact Messages</h2>
    <table>
        <tr><th>Name</th><th>Email</th><th>Service</th><th>Message</th><th>Date</th></tr>
        <?php while($row = $contacts->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['name']) ?></td>
            <td><?= htmlspecialchars($row['email']) ?></td>
            <td><?= htmlspecialchars($row['service']) ?></td>
            <td><?= htmlspecialchars($row['message']) ?></td>
            <td><?= htmlspecialchars($row['created_at']) ?></td>
        </tr>
        <?php endwhile; ?>
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
    *   (Optional) If you see a default `default.php` file, you can delete it.

3.  **Upload Frontend (React App):**
    *   On your computer, open the `dist` folder created in Step 2.
    *   Select all files inside `dist` (e.g., `index.html`, `assets` folder, etc.).
    *   Drag and drop them into the `public_html` folder in Hostinger File Manager.
    *   *Check:* `index.html` should be visible directly inside `public_html`.

4.  **Upload Backend (PHP Files):**
    *   Inside `public_html`, right-click (or use the toolbar) and select **New Folder**.
    *   Name it `api` and click **Create**.
    *   Double-click to open the new `api` folder.
    *   **Option A (Upload):** If you created the PHP files on your computer, click the **Upload** icon (up arrow) in the top right, select the 4 files (`db_connect.php`, `contact.php`, `booking.php`, `view_data.php`), and upload them.
    *   **Option B (Create Directly):**
        *   Click the **New File** icon.
        *   Name it `db_connect.php`.
        *   Paste the code from Step 3.1 and click **Save**.
        *   Repeat for `contact.php`, `booking.php`, and `view_data.php`.

---

## Step 5: Visualize Data

To see your data, visit:

`https://yourdomain.com/api/view_data.php?key=secret123`

*(Remember to replace 'secret123' with the key you set in `view_data.php`)*