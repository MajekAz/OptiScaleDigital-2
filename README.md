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
The `api/setup.php` script automatically creates the following tables. If you need to manage them manually via phpMyAdmin, here is the structure:

### 1. `contacts` (General Inquiries)
Stores data from the "Contact Us" page form.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto-Increment |
| `name` | VARCHAR(255) | Full name of the sender |
| `email` | VARCHAR(255) | Contact email address |
| `service` | VARCHAR(100) | Selected service (Web, AI, Marketing) |
| `message` | TEXT | The detailed inquiry message |
| `created_at` | TIMESTAMP | Auto-generated timestamp of submission |

### 2. `bookings` (Consultations)
Stores scheduled discovery calls from the "Booking" page.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto-Increment |
| `name` | VARCHAR(255) | Client name |
| `email` | VARCHAR(255) | Client email |
| `service` | VARCHAR(100) | Topic of consultation |
| `booking_date` | DATE | Selected date for the call |
| `booking_time` | VARCHAR(20) | Selected time slot (e.g., "14:30") |
| `created_at` | TIMESTAMP | When the booking was placed |

### 3. `blog_posts` (Content Management)
Stores all articles managed via the Admin Dashboard.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto-Increment |
| `title` | VARCHAR(255) | Post headline |
| `excerpt` | TEXT | Short summary for the blog card |
| `content` | LONGTEXT | Full HTML content of the article |
| `author` | VARCHAR(100) | Name of the writer |
| `category` | VARCHAR(50) | e.g., "AI Automation", "Web Design" |
| `image` | LONGTEXT | Base64 encoded featured image data |
| `status` | VARCHAR(20) | 'published', 'draft', or 'scheduled' |
| `scheduled_at` | DATETIME | Future release time for scheduled posts |
| `created_at` | DATE | Display date of the article |

### 4. `subscribers` (Newsletter)
Stores email addresses for newsletter signups.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key, Auto-Increment |
| `email` | VARCHAR(255) | Unique email address (indexed) |
| `subscribed_at` | TIMESTAMP | Timestamp of signup |

---

## Admin Dashboard
- **URL**: `https://yourdomain.com/#/admin`
- **Security Key**: `secret123` (Change this in `api/admin_data.php` for production)
- **Features**: Real-time Lead tracking, Newsletter list management, and Article Scheduling.
