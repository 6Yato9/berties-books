# Bertie's Books 📚

**Bertie's Books** is a dynamic Node.js web application for managing a bookshop inventory. Users can browse available books, add new entries, register, and search the catalog using exact or partial matches. This project demonstrates full-stack web development with Express routing, EJS templating, and MySQL database integration.

---

## ✨ Features

- **Browse Books** — View complete inventory with prices
- **Add Books** — Simple form-based interface to add new books to the database
- **Advanced Search** — Partial matching search to find books by title
- **Bargain Books** — Filter and display books priced under £20
- **User Registration** — Register new users with form validation
- **Responsive Design** — Clean, modern UI with custom CSS styling
- **Database-Driven** — All data persisted in MySQL with parameterized queries for security

---

## 🛠️ Technologies Used

- **Node.js** — JavaScript runtime environment
- **Express.js** — Fast, minimalist web framework
- **EJS** — Embedded JavaScript templating engine
- **MySQL2** — MySQL database driver with connection pooling
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
```

This will:
- Create the `myBookshop` database
- Create the `books` table
- Create a database user `berties_books_app` with appropriate permissions
- Insert sample book data

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

| Route                  | Method | Description                              |
| ---------------------- | ------ | ---------------------------------------- |
| `/`                    | GET    | Homepage with navigation links           |
| `/about`               | GET    | About Bertie's Books page                |
| `/search`              | GET    | Search form for books                    |
| `/search-result`       | GET    | Display search results                   |
| `/register`            | GET    | User registration form                   |
| `/registered`          | POST   | Handle registration submission           |
| `/list`                | GET    | Display all books in inventory           |
| `/books/addbook`       | GET    | Form to add a new book                   |
| `/bookadded`           | POST   | Handle book submission to database       |
| `/books/bargainbooks`  | GET    | Display books priced under £20           |

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

| Column | Type          | Description                |
| ------ | ------------- | -------------------------- |
| `id`   | INT           | Primary key, auto-increment |
| `name` | VARCHAR(50)   | Book title                 |
| `price`| DECIMAL(5, 2) | Book price in GBP          |

---

## 📁 Project Structure

```
berties-books/
├── index.js              # Main application entry point
├── package.json          # Project dependencies
├── create_db.sql         # Database creation script
├── insert_test_data.sql  # Sample data
├── routes/
│   ├── main.js          # Main application routes
│   └── books.js         # Books-related routes (modular)
├── views/
│   ├── index.ejs        # Homepage
│   ├── about.ejs        # About page
│   ├── search.ejs       # Search form
│   ├── searchresults.ejs # Search results
│   ├── list.ejs         # Book list
│   ├── addbook.ejs      # Add book form
│   ├── bargainlist.ejs  # Bargain books list
│   └── register.ejs     # Registration form
└── public/
    └── main.css         # Custom styles
```

---

## 🐛 Troubleshooting

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

---

## 👤 Author

**Student ID:** 33821100  
**GitHub:** [@Hwane14](https://github.com/Hwane14)
