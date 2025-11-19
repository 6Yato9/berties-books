# Bertie's Books 📚

**Bertie's Books** is a dynamic Node.js web application for managing a bookshop inventory. Users can browse available books, add new entries, register, and search the catalog using exact or partial matches. This project demonstrates full-stack web development with Express routing, EJS templating, and MySQL database integration.

---

## ✨ Features

- **Browse Books** — View complete inventory with prices
- **Add Books** — Simple form-based interface to add new books to the database
- **Advanced Search** — Partial matching search to find books by title
- **Bargain Books** — Filter and display books priced under £20
- **User Authentication** — Complete registration and login system with secure password hashing
- **User Management** — View all registered users (without passwords for security)
- **Audit Logging** — Track all login attempts (successful and failed) with timestamps
- **Responsive Design** — Clean, modern UI with custom CSS styling
- **Database-Driven** — All data persisted in MySQL with parameterized queries for security

---

## 🛠️ Technologies Used

- **Node.js** — JavaScript runtime environment
- **Express.js** — Fast, minimalist web framework
- **EJS** — Embedded JavaScript templating engine
- **MySQL2** — MySQL database driver with connection pooling
- **bcrypt** — Industry-standard library for secure password hashing
- **Body-Parser** — Middleware for parsing request bodies
- **CSS3** — Custom styling for modern UI

---

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher) — [Download here](https://nodejs.org/)
- **MySQL** (v5.7 or higher) — [Download here](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Hwane14/06_berties_33821100
cd 06_berties_33821100
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up the MySQL Database

Start your MySQL server and run the following commands:

```bash
mysql -u root -p < create_db.sql
mysql -u root -p myBookshop < insert_test_data.sql
mysql -u berties_books_app -p myBookshop < create_tables.sql
```

This will:

- Create the `myBookshop` database
- Create the `books` table
- Create a database user `berties_books_app` with appropriate permissions
- Insert sample book data
- Create the `users` and `audit_log` tables for authentication

### 4. Start the Application

```bash
node index.js
```

You should see: `Example app listening on port 8000!`

### 5. Access the Application

Open your browser and navigate to:

```
http://localhost:8000
```

---

## 🗺️ Available Routes

### Main Routes

| Route         | Method | Description                        |
| ------------- | ------ | ---------------------------------- |
| `/`           | GET    | Homepage with navigation links     |
| `/about`      | GET    | About Bertie's Books page          |
| `/register`   | GET    | User registration form (legacy)    |
| `/registered` | POST   | Handle registration (legacy)       |
| `/bookadded`  | POST   | Handle book submission to database |

### Books Routes (prefix: `/books`)

| Route                  | Method | Description                    |
| ---------------------- | ------ | ------------------------------ |
| `/books/search`        | GET    | Search form for books          |
| `/books/search-result` | GET    | Display search results         |
| `/books/list`          | GET    | Display all books in inventory |
| `/books/addbook`       | GET    | Form to add a new book         |
| `/books/bargainbooks`  | GET    | Display books priced under £20 |

### User Authentication Routes (prefix: `/users`)

| Route               | Method | Description                               |
| ------------------- | ------ | ----------------------------------------- |
| `/users/register`   | GET    | User registration form                    |
| `/users/registered` | POST   | Handle registration with password hashing |
| `/users/login`      | GET    | User login form                           |
| `/users/loggedin`   | POST   | Process login with password verification  |
| `/users/list`       | GET    | Display all registered users              |
| `/users/audit`      | GET    | View complete audit history               |

---

## 🔍 Advanced Search Feature

The search functionality supports **partial, case-insensitive matching** using SQL `LIKE` queries with wildcards.

**Example:**

- Searching for `"World"` will return:
  - _Brave New World_
  - _Atlas of the World_
  - _World History_

This allows users to find books even if they only remember part of the title.

---

## 💾 Database Schema

### Books Table

| Column  | Type          | Description                 |
| ------- | ------------- | --------------------------- |
| `id`    | INT           | Primary key, auto-increment |
| `name`  | VARCHAR(50)   | Book title                  |
| `price` | DECIMAL(5, 2) | Book price in GBP           |

### Users Table

| Column           | Type         | Description                 |
| ---------------- | ------------ | --------------------------- |
| `id`             | INT          | Primary key, auto-increment |
| `username`       | VARCHAR(50)  | Unique username for login   |
| `first_name`     | VARCHAR(100) | User's first name           |
| `last_name`      | VARCHAR(100) | User's last name            |
| `email`          | VARCHAR(255) | User's email address        |
| `hashedPassword` | VARCHAR(255) | Bcrypt-hashed password      |
| `created_at`     | TIMESTAMP    | Account creation timestamp  |

### Audit Log Table

| Column      | Type         | Description                     |
| ----------- | ------------ | ------------------------------- |
| `id`        | INT          | Primary key, auto-increment     |
| `username`  | VARCHAR(50)  | Username attempting login       |
| `success`   | BOOLEAN      | Whether login was successful    |
| `message`   | VARCHAR(255) | Details about the login attempt |
| `timestamp` | DATETIME     | When the login attempt occurred |

---

## 📁 Project Structure

```
berties-books/
├── index.js              # Main application entry point
├── package.json          # Project dependencies
├── create_db.sql         # Database creation script
├── create_tables.sql     # User and audit tables script
├── insert_test_data.sql  # Sample data
├── routes/
│   ├── main.js          # Main application routes
│   ├── books.js         # Books-related routes (modular)
│   └── users.js         # User authentication routes
├── views/
│   ├── index.ejs        # Homepage
│   ├── about.ejs        # About page
│   ├── search.ejs       # Search form
│   ├── searchresults.ejs # Search results
│   ├── list.ejs         # Book list
│   ├── addbook.ejs      # Add book form
│   ├── bargainlist.ejs  # Bargain books list
│   ├── register.ejs     # Registration form
│   ├── login.ejs        # Login form
│   ├── listusers.ejs    # Users list page
│   └── audit.ejs        # Audit log page
└── public/
    └── main.css         # Custom styles
```

---

## � Audit Logging

### Overview

The audit logging feature provides comprehensive tracking of all login attempts to enhance security and accountability. Every time a user attempts to log in, whether successful or failed, the system records the attempt in the `audit_log` database table.

### How It Works

1. **Recording Login Attempts**: When a user submits the login form at `/users/login`, the system:

   - Checks if the username exists in the database
   - Verifies the password using bcrypt's secure comparison
   - Logs the attempt with a timestamp, username, success status, and descriptive message

2. **Types of Audit Entries**:

   - **Successful Login**: Recorded when username and password match
   - **User Not Found**: Recorded when the username doesn't exist
   - **Incorrect Password**: Recorded when the password doesn't match

3. **Viewing Audit Logs**: Navigate to `/users/audit` to view all login attempts in reverse chronological order (most recent first). The audit page displays:
   - Unique log entry ID
   - Username involved in the attempt
   - Success/failure status (color-coded for easy identification)
   - Descriptive message explaining the result
   - Timestamp of when the attempt occurred

### Security Benefits

- **Intrusion Detection**: Identify suspicious login patterns or brute-force attempts
- **Accountability**: Track who accessed the system and when
- **Debugging**: Help troubleshoot login issues reported by users
- **Compliance**: Meet security audit requirements for tracking authentication events

### Database Implementation

The audit log uses a dedicated `audit_log` table with indexes on `username` and `timestamp` columns for efficient querying. The `logAuditTrail()` helper function in `routes/users.js` handles all audit logging automatically, ensuring consistent tracking across all login attempts.

### Note on Security

In a production environment, audit logs should be:

- Stored with restricted access permissions
- Regularly backed up
- Retained according to organizational security policies
- Monitored for unusual patterns using automated tools

---

## �🐛 Troubleshooting

### Database Connection Error

If you see `Access denied for user 'berties_books_app'`:

1. Ensure you ran `create_db.sql` with root privileges
2. Verify the database name is `myBookshop` (not `berties_books`)
3. Check that the user has proper permissions:
   ```sql
   SHOW GRANTS FOR 'berties_books_app'@'localhost';
   ```

### Port Already in Use

If port 8000 is already in use:

```bash
# Find and kill the process using port 8000
lsof -ti:8000 | xargs kill -9
```

Or change the port in `index.js`:

```javascript
const port = 3000; // Change to any available port
```

---

## 📝 License

This project is part of the Dynamic Web Applications module coursework.
