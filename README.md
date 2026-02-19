# OptiScale Digital - Hostinger Live Deployment

Follow these steps to connect your forms and go live.

## 1. Create the Database (Hostinger hPanel)
1. Log in to your Hostinger hPanel.
2. Go to **Databases** > **MySQL Management**.
3. Create a new database. Note down the **DB Name**, **Username**, and **Password**.

## 2. Configure PHP Connection
1. Open `api/db_connect.php` in your code editor.
2. Replace the placeholders with the details from Step 1:
   ```php
   $user = "u123456789_optiscale"; // Your DB Username
   $pass = "YourSecurePassword";   // Your DB Password
   $db   = "u123456789_db";         // Your DB Name
   ```
3. Save the file.

## 3. Upload and Auto-Setup
1. Upload the entire `api/` folder to your Hostinger `public_html/` directory.
2. Open your browser and visit: `https://yourdomain.com/api/setup.php`
3. The screen should show "✓ Table ready" for all 4 tables.
4. **Important**: Delete `api/setup.php` from your server after this step for security.

## 4. Frontend Upload
1. Build your app locally: `npm run build`
2. Upload the contents of the `dist/` folder to `public_html/`.

---

## Database Schema Reference
The `api/setup.php` script automatically creates the following tables.

### 1. `contacts` (General Inquiries)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key |
| `name` | VARCHAR(255) | Sender name |
| `email` | VARCHAR(255) | Sender email |
| `service` | VARCHAR(100) | Requested service |
| `message` | TEXT | Inquiry details |
| `created_at` | TIMESTAMP | Submission time |

### 2. `bookings` (Consultations)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key |
| `name` | VARCHAR(255) | Client name |
| `email` | VARCHAR(255) | Client email |
| `booking_date` | DATE | Selected date |
| `booking_time` | VARCHAR(20) | Selected slot |

### 3. `blog_posts` (Content Management)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key |
| `title` | VARCHAR(255) | Headline |
| `content` | LONGTEXT | Article body |
| `status` | VARCHAR(20) | 'published' / 'scheduled' |
| `scheduled_at` | DATETIME | Future release time |

### 4. `subscribers` (Newsletter)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key |
| `email` | VARCHAR(255) | Unique email |

---

## Admin Dashboard
- **URL**: `https://yourdomain.com/#/admin`
- **Security Key**: `secret123`
- **Features**: Real-time Lead tracking, Newsletter list management, and Article Scheduling.
