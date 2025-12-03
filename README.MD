# Bertie's Books 📚

**Bertie's Books** is a dynamic Node.js web application for managing a bookshop inventory. Users can browse available books, add new entries, register, login, view all registered users, and search the catalog using exact or partial matches. This project demonstrates full-stack web development with Express routing, EJS templating, and MySQL database integration.

---

## ✨ Features

- **Browse Books** — View complete inventory with prices
- **Add Books** — Simple form-based interface to add new books to the database
- **Advanced Search** — Partial matching search to find books by title
- **Bargain Books** — Filter and display books priced under £20
- **User Authentication** — Complete registration and login system with secure password hashing
- **Session Management** — Track logged-in users with express-session middleware
- **Access Control** — Restrict sensitive routes to authenticated users only
- **Dynamic UI** — Conditional display of login/logout links based on authentication state
- **Input Validation** — Server-side validation using express-validator for email format, username length, and password strength
- **XSS Protection** — Input sanitization using express-sanitizer to prevent Cross-Site Scripting attacks
- **User Management** — View all registered users (without passwords for security)
- **Audit Logging** — Track all login attempts (successful and failed) with timestamps
- **Weather Forecast** — Real-time weather information using OpenWeatherMap API with interactive city search
- **REST API** — JSON API endpoints for external access with search, filtering, and sorting capabilities
- **Responsive Design** — Clean, modern UI with custom CSS styling
- **Database-Driven** — All data persisted in MySQL with parameterized queries for security

---

## 🛠️ Technologies Used

- **Node.js** — JavaScript runtime environment
- **Express.js** — Fast, minimalist web framework
- **EJS** — Embedded JavaScript templating engine
- **MySQL2** — MySQL database driver with connection pooling
- **bcrypt** — Industry-standard library for secure password hashing
- **express-session** — Session middleware for user authentication and access control
- **express-validator** — Server-side validation for form inputs
- **express-sanitizer** — Input sanitization to prevent XSS attacks
- **request** — HTTP client for making API calls to external services
- **OpenWeatherMap API** — Third-party API for real-time weather data
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
- Insert a default test user for login testing

**Default Test User Credentials:**

- Username: `gold`
- Password: `smiths`

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

| Route              | Method | Description                        |
| ------------------ | ------ | ---------------------------------- |
| `/`                | GET    | Homepage with navigation links     |
| `/about`           | GET    | About Bertie's Books page          |
| `/weather`         | GET    | Weather forecast form              |
| `/weather/results` | GET    | Display weather for specified city |
| `/logout`          | GET    | Logout user and destroy session    |
| `/register`        | GET    | User registration form (legacy)    |
| `/registered`      | POST   | Handle registration (legacy)       |
| `/bookadded`       | POST   | Handle book submission to database |

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

### API Routes (prefix: `/api`)

| Route        | Method | Description                                                 |
| ------------ | ------ | ----------------------------------------------------------- |
| `/api/books` | GET    | Return all books in JSON format (supports query parameters) |

**Query Parameters for `/api/books`:**

| Parameter   | Type   | Description                                  | Example                   |
| ----------- | ------ | -------------------------------------------- | ------------------------- |
| `search`    | string | Filter books by name containing this keyword | `/api/books?search=world` |
| `minprice`  | number | Filter books with price >= this value        | `/api/books?minprice=5`   |
| `max_price` | number | Filter books with price <= this value        | `/api/books?max_price=10` |
| `sort`      | string | Sort results by 'name' or 'price'            | `/api/books?sort=name`    |

**Example API Calls:**

```bash
# Get all books
curl http://localhost:8000/api/books

# Search for books containing "world"
curl http://localhost:8000/api/books?search=world

# Get books priced between £5 and £10
curl http://localhost:8000/api/books?minprice=5&max_price=10

# Get all books sorted by name
curl http://localhost:8000/api/books?sort=name

# Get all books sorted by price
curl http://localhost:8000/api/books?sort=price

# Combined: Search for "farm", price between 10-20, sorted by price
curl http://localhost:8000/api/books?search=farm&minprice=10&max_price=20&sort=price
```

**Response Format:**

```json
[
  {
    "id": 1,
    "name": "Brighton Rock",
    "price": "20.25"
  },
  {
    "id": 2,
    "name": "Brave New World",
    "price": "25.00"
  }
]
```

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

## 🔐 Session Management & Access Control

### Overview

The application implements session management using `express-session` to track logged-in users and restrict access to certain routes based on authentication status.

### Implementation Details

**Session Configuration** (in `index.js`):

- Secret: `somerandomstuff` (should be a strong random string in production)
- `resave: false` - Don't save session if unmodified
- `saveUninitialized: false` - Don't create session until something is stored
- Cookie expiration: 600,000 ms (10 minutes)

**Session Storage**:

- When a user successfully logs in, their `username` is stored in `req.session.userId`
- This session persists across requests until logout or expiration

**Logout Functionality**:

- Route: `/logout`
- Destroys the user session using `req.session.destroy()`
- Redirects to homepage with a logout confirmation message
- Accessible via logout link on the homepage

**Dynamic UI Based on Authentication State**:

The homepage dynamically displays login/logout links based on the user's authentication status, providing a better user experience:

- **When NOT logged in**: Shows "Login" link
- **When logged in**: Shows "Logout" link

**Implementation**:

The homepage route (`/`) passes the session status to the view:

```javascript
app.get("/", function (req, res) {
  res.render("index.ejs", {
    shopData: shopData,
    isLoggedIn: !!req.session.userId,
  });
});
```

The EJS template (`index.ejs`) uses conditional rendering:

```html
<% if (!isLoggedIn) { %>
<p><a href="users/login">Login</a></p>
<% } %> <% if (isLoggedIn) { %>
<p><a href="logout">Logout</a></p>
<% } %>
```

**Benefits**:

- Improved user experience with contextually relevant navigation
- Prevents confusion about authentication state
- Reduces clutter by only showing relevant actions

### Access Control

The application uses a `redirectLogin` middleware function to protect routes that require authentication. This middleware checks if a user is logged in (by verifying `req.session.userId` exists) and redirects to the login page if not.

**Routes with Access Control (Login Required)**:

| Route            | Access Level | Reason                                  |
| ---------------- | ------------ | --------------------------------------- |
| `/users/list`    | 🔒 Protected | Viewing user information requires login |
| `/users/audit`   | 🔒 Protected | Audit logs contain sensitive data       |
| `/books/addbook` | 🔒 Protected | Only logged-in users can add books      |
| `/logout`        | 🔒 Protected | Must be logged in to log out            |

**Public Routes (No Login Required)**:

| Route                  | Access Level | Reason                                           |
| ---------------------- | ------------ | ------------------------------------------------ |
| `/`                    | 🌐 Public    | Homepage should be accessible to everyone        |
| `/about`               | 🌐 Public    | Information page should be public                |
| `/users/register`      | 🌐 Public    | Must be public for new user registration         |
| `/users/login`         | 🌐 Public    | Must be public for users to log in               |
| `/books/search`        | 🌐 Public    | Allow browsing/searching without login           |
| `/books/search-result` | 🌐 Public    | Allow viewing search results without login       |
| `/books/list`          | 🌐 Public    | Allow browsing book catalog without login        |
| `/books/bargainbooks`  | 🌐 Public    | Allow viewing bargain books without login        |
| `/bookadded`           | 🌐 Public    | POST route for adding books (could be protected) |

### Testing Access Control and Dynamic UI

**To test the access control and conditional UI display:**

1. **Without logging in:**

   - Visit the homepage (`/`) - You should see the "Login" link, but NOT the "Logout" link
   - Try to access `/users/list` - You should be redirected to `/users/login`
   - Try to access `/users/audit` - You should be redirected to `/users/login`
   - Try to access `/books/addbook` - You should be redirected to `/users/login`

2. **After logging in:**

   - Return to the homepage (`/`) - You should see the "Logout" link, but NOT the "Login" link
   - Access `/users/list` - You should see the list of users
   - Access `/users/audit` - You should see the audit log
   - Access `/books/addbook` - You should see the add book form

3. **After logging out:**
   - Click the logout link on the homepage
   - Check the homepage - You should now see "Login" again, but NOT "Logout"
   - Try accessing protected pages again - You should be redirected to login

### Security Considerations

- Session secret should be a strong, randomly generated string in production
- Session data is stored server-side; only a session ID cookie is sent to the client
- Cookie expiration ensures sessions don't persist indefinitely
- The `redirectLogin` middleware prevents unauthorized access to sensitive routes
- In production, use HTTPS to protect session cookies from interception

---

## ✅ Input Validation & Sanitization

### Overview

The application implements robust input validation and sanitization to ensure data integrity and protect against security vulnerabilities, particularly Cross-Site Scripting (XSS) attacks.

### Validation (express-validator)

**Purpose**: Ensure user inputs meet specific requirements before processing.

**Implementation in Registration Route** (`/users/registered`):

| Field      | Validation Rule                 | Description                         |
| ---------- | ------------------------------- | ----------------------------------- |
| `email`    | `isEmail()`                     | Must be a valid email format        |
| `username` | `isLength({ min: 5, max: 20 })` | Must be between 5 and 20 characters |
| `password` | `isLength({ min: 8 })`          | Must be at least 8 characters long  |

**Password Requirement**: The validation allows the password `aaaaAAAA1234!` as specified in the requirements, meeting the minimum 8-character length.

**How it works**:

1. Validation middleware runs before the route handler
2. If validation fails, user is redirected back to the registration page
3. If validation passes, the registration process continues
4. `validationResult(req)` checks for validation errors

**Code Example**:

```javascript
router.post(
  "/registered",
  [
    check("email").isEmail(),
    check("username").isLength({ min: 5, max: 20 }),
    check("password").isLength({ min: 8 }),
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect("./register");
    } else {
      // Continue with registration
    }
  }
);
```

### Sanitization (express-sanitizer)

**Purpose**: Remove or encode potentially malicious HTML/JavaScript from user inputs to prevent XSS attacks.

**Configuration**: Applied globally as middleware in `index.js`:

```javascript
app.use(expressSanitizer());
```

**Where Sanitization is Applied**:

| Route               | Fields Sanitized            | Reason                                   |
| ------------------- | --------------------------- | ---------------------------------------- |
| `/users/registered` | `first`, `last`, `username` | Prevent XSS when displaying user data    |
| `/users/loggedin`   | `username`                  | Prevent XSS in login responses           |
| `/bookadded`        | `name`, `price`             | Prevent XSS when displaying book details |

**Fields NOT Sanitized**:

- **Passwords**: Left unsanitized because they are hashed (not displayed) and need exact character matching for bcrypt comparison
- **Email**: Already validated for correct format; parameterized queries prevent SQL injection

**Code Example**:

```javascript
const sanitizedFirst = req.sanitize(req.body.first);
const sanitizedLast = req.sanitize(req.body.last);
const sanitizedUsername = req.sanitize(req.body.username);
```

### XSS Attack Demonstration

**What is XSS?**
Cross-Site Scripting (XSS) is an attack where malicious scripts are injected into web pages viewed by other users.

**Example Attack**:
If an attacker enters this in the "First Name" field without sanitization:

```html
Henry
<script>
  alert("Gotcha!");
</script>
```

Without sanitization, this JavaScript would execute when the user data is displayed, showing an alert popup.

**With Sanitization**:
The `express-sanitizer` middleware converts dangerous characters:

```html
Henry &lt;script&gt;alert("Gotcha!")&lt;/script&gt;
```

The script tags are encoded and displayed as plain text instead of executing.

### Testing Validation and Sanitization

**Test Validation**:

1. Try to register with an invalid email (e.g., "notanemail")
2. Try a username shorter than 5 characters
3. Try a password shorter than 8 characters
4. In all cases, you should be redirected back to the registration page

**Test Sanitization (XSS Prevention)**:

1. Go to the registration page
2. Enter in the "First name" field: `Henry <script>alert("Gotcha!")</script>`
3. Fill other fields correctly and submit
4. Check the confirmation message - the script tags should appear as text, not execute

**Valid Password Test**:

- Password `aaaaAAAA1234!` meets the minimum 8-character requirement and should pass validation

### Security Benefits

- **Data Integrity**: Ensures data meets expected formats before database storage
- **XSS Prevention**: Removes malicious scripts from user inputs
- **User Experience**: Provides immediate feedback on invalid inputs
- **Defense in Depth**: Multiple security layers (validation + sanitization + parameterized queries)

### Additional Validation in Other Forms

While the primary focus is on the registration form, similar validation and sanitization principles can be applied to:

- Login form (username sanitization applied)
- Book addition form (name and price sanitization applied)
- Search forms (already protected through parameterized SQL queries)

---

## 🌤️ Weather Forecast Feature

### Overview

The application integrates with the **OpenWeatherMap API** to provide real-time weather information for any city worldwide. This feature demonstrates how to consume external APIs in a Node.js application.

### API Configuration

**API Provider**: [OpenWeatherMap](https://openweathermap.org/)

**API Key Storage**: The API key is stored in the `.env` file for security:

```
WEATHER_API_KEY=your_api_key_here
```

**⚠️ Security Note**: Never hardcode API keys in your source code. Always use environment variables to keep sensitive credentials secure and out of version control.

### Implementation Details

**Routes**:

- **`GET /weather`** - Displays a form where users can enter a city name
- **`GET /weather/results?city={cityName}`** - Fetches and displays weather data for the specified city

**API Endpoint Used**:

```
http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={apiKey}
```

**Weather Data Displayed**:

- Current temperature (in Celsius)
- Humidity percentage
- Wind speed (in meters per second)
- Weather description (e.g., "clear sky", "light rain")

### Code Example

```javascript
const request = require("request");

app.get("/weather/results", function (req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = req.query.city || "London";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      next(err);
    } else {
      var weather = JSON.parse(body);

      // Error handling: Check if weather data is valid
      if (weather !== undefined && weather.main !== undefined) {
        // Display weather information
      } else {
        res.send("No data found for city: " + city);
      }
    }
  });
});
```

### Error Handling

The weather route includes robust error handling to deal with common issues:

1. **Invalid City Names**: If the API doesn't find data for the specified city, a user-friendly error message is displayed:

   ```
   No data found for city: XYZ. Please try another city.
   ```

2. **API Errors**: Network errors or API failures are caught and handled gracefully

3. **Missing Data**: The code checks if `weather.main` is defined before accessing its properties to prevent crashes

### Why Error Handling is Critical

APIs are external services that you don't control. They can:

- Return unexpected data formats
- Be temporarily unavailable
- Have rate limits or quotas
- Return error responses for invalid inputs

**Without proper error handling**, your application will crash when encountering these scenarios. Always validate API responses before using the data.

### Testing the Weather Feature

**Test with Valid Cities**:

1. Navigate to `http://localhost:8000/weather`
2. Enter a city name (e.g., "London", "Manchester", "Tokyo")
3. Click "Get Weather"
4. You should see temperature, humidity, wind speed, and weather description

**Test Error Handling**:

1. Enter a non-existent city name (e.g., "XYZ123")
2. Click "Get Weather"
3. You should see: "No data found for city: XYZ123. Please try another city."

**Test Direct URL Access**:

- Visit: `http://localhost:8000/weather/results?city=Paris`
- Should display Paris weather immediately

### Getting Your Own API Key

To use this feature, you need a free OpenWeatherMap API key:

1. Sign up at [https://openweathermap.org/appid](https://openweathermap.org/appid)
2. Get your API key from [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
3. Add it to your `.env` file:
   ```
   WEATHER_API_KEY=your_actual_api_key
   ```
4. **Note**: API key activation takes about 10 minutes

### API Request Limitations

**Free Tier Limits**:

- 60 calls per minute
- 1,000,000 calls per month
- Current weather data only (no forecasts)

For production applications with high traffic, consider:

- Implementing caching to reduce API calls
- Rate limiting on your routes
- Upgrading to a paid API plan if needed

### Future Enhancements

Possible improvements to the weather feature:

- Display 5-day weather forecast
- Show weather icons
- Add geolocation to auto-detect user's city
- Cache weather data to reduce API calls
- Display more detailed information (sunrise/sunset, pressure, visibility)
- Add a search history feature

---

## � REST API

### Overview

The application provides a RESTful API that allows external developers to access bookshop data programmatically. The API returns data in JSON format, making it easy to integrate with other applications, mobile apps, or third-party services.

### Key Features

- **Machine-Readable Format**: All responses in JSON
- **Search Functionality**: Filter books by keyword
- **Price Filtering**: Get books within a specific price range
- **Sorting**: Order results by name or price
- **No Authentication Required**: Public API accessible to all (as per lab requirements)

### API Endpoint

**Base URL**: `http://localhost:8000/api`

**Endpoint**: `GET /api/books`

Returns a list of books from the database in JSON format.

### Query Parameters

All parameters are optional and can be combined:

| Parameter   | Type   | Description                           | Example Value |
| ----------- | ------ | ------------------------------------- | ------------- |
| `search`    | string | Filter by name (case-insensitive)     | `world`       |
| `minprice`  | number | Minimum price (inclusive)             | `5`           |
| `max_price` | number | Maximum price (inclusive)             | `10`          |
| `sort`      | string | Sort by 'name' or 'price' (ascending) | `name`        |

### Usage Examples

**1. Get All Books**

```bash
GET /api/books
```

**Response:**

```json
[
  { "id": 1, "name": "Brighton Rock", "price": "20.25" },
  { "id": 2, "name": "Brave New World", "price": "25.00" },
  { "id": 3, "name": "Animal Farm", "price": "12.99" }
]
```

**2. Search for Books**

```bash
GET /api/books?search=world
```

**Response:** Returns books containing "world" in the name

**3. Filter by Price Range**

```bash
GET /api/books?minprice=5&max_price=10
```

**Response:** Returns books priced between £5 and £10

**4. Sort Results**

```bash
# Sort alphabetically by name
GET /api/books?sort=name

# Sort by price (low to high)
GET /api/books?sort=price
```

**5. Combine Multiple Parameters**

```bash
GET /api/books?search=farm&minprice=10&max_price=20&sort=price
```

**Response:** Books containing "farm", priced £10-£20, sorted by price

### Implementation Details

The API is implemented in `/routes/api.js` and uses:

- **Express Router** for route handling
- **Parameterized SQL Queries** to prevent SQL injection
- **Dynamic Query Building** to handle optional parameters
- **res.json()** to send proper JSON responses with correct Content-Type headers

**Code Structure:**

```javascript
router.get("/books", function (req, res, next) {
  let sqlquery = "SELECT * FROM books";
  let conditions = [];
  let params = [];

  // Add filters based on query parameters
  if (req.query.search) {
    conditions.push("name LIKE ?");
    params.push("%" + req.query.search + "%");
  }

  // Execute query and return JSON
  db.query(sqlquery, params, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json(result); // Sends JSON with proper headers
    }
  });
});
```

### Differences from Web Routes

**API Route (`/api/books`)**:

- Returns raw JSON data
- No HTML rendering
- Designed for machine consumption
- Content-Type: `application/json`
- No authentication required

**Web Route (`/books/list`)**:

- Renders HTML via EJS templates
- Styled for human viewing
- Includes navigation, headers, footers
- Content-Type: `text/html`

### Testing the API

**Using cURL (Command Line)**:

```bash
# Basic request
curl http://localhost:8000/api/books

# With search parameter
curl "http://localhost:8000/api/books?search=world"

# Multiple parameters (use quotes)
curl "http://localhost:8000/api/books?minprice=5&max_price=15&sort=name"

# Pretty-print JSON (with jq)
curl -s http://localhost:8000/api/books | jq .
```

**Using Browser**:
Simply navigate to:

- `http://localhost:8000/api/books`
- `http://localhost:8000/api/books?search=world`
- `http://localhost:8000/api/books?sort=price`

**Using JavaScript (fetch)**:

```javascript
// Get all books
fetch("http://localhost:8000/api/books")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Search with parameters
fetch("http://localhost:8000/api/books?search=world&sort=price")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

**Using Postman or Thunder Client**:
Create a GET request to `http://localhost:8000/api/books` and add query parameters as needed.

### Security Considerations

1. **SQL Injection Protection**: Uses parameterized queries with `?` placeholders
2. **No Authentication**: API is publicly accessible (as specified in lab requirements)
3. **Read-Only**: Only GET requests supported (no POST/PUT/DELETE)
4. **No Rate Limiting**: Currently unlimited requests (consider adding in production)

### Extension Ideas

The current API can be extended with:

- POST `/api/books` - Add new books
- GET `/api/books/:id` - Get a single book by ID
- PUT `/api/books/:id` - Update book details
- DELETE `/api/books/:id` - Remove a book
- Authentication with API keys
- Rate limiting to prevent abuse
- Pagination for large result sets
- Additional filters (author, genre, ISBN)

### Use Cases

This API enables developers to:

- Build mobile apps that display book inventory
- Create price comparison tools
- Integrate with e-commerce platforms
- Generate reports and analytics
- Sync data with other systems
- Build third-party widgets or plugins

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
