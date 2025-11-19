/**
 * Bertie's Books - Main Application Entry Point
 *
 * This is the main server file that initializes the Express application,
 * configures middleware, sets up database connections, and loads route handlers.
 */

// ==================== Module Imports ====================
// Import required Node.js modules and external packages
var express = require("express"); // Web framework for Node.js
var ejs = require("ejs"); // Template engine for rendering dynamic HTML
var bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
var mysql = require("mysql2"); // MySQL database driver

// ==================== Application Setup ====================
// Create the Express application instance
const app = express();
const port = 8000; // Port number the server will listen on

// Configure body-parser middleware to handle URL-encoded form data
// extended: true allows for rich objects and arrays to be encoded
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== Static Files & Views Configuration ====================
// Serve static files (CSS, images, etc.) from the 'public' directory
// This allows files in /public to be accessed directly via URLs
app.use(express.static(__dirname + "/public"));

// Set the directory where Express will find view templates
// __dirname is the current directory path
app.set("views", __dirname + "/views");

// Configure EJS as the templating engine
// This allows us to use .ejs files to create dynamic HTML pages
app.set("view engine", "ejs");

// Tell Express to use EJS's rendering engine for .html files as well
app.engine("html", ejs.renderFile);

// ==================== Application Data ====================
// Define global shop data that will be passed to all templates
var shopData = { shopName: "Bertie's Books" };

// ==================== Database Configuration ====================
// Create a connection pool for MySQL database
// Using a pool allows multiple simultaneous database connections for better performance
const db = mysql.createPool({
  host: "localhost", // Database server location
  user: "berties_books_app", // Database user with appropriate permissions
  password: "qwertyuiop", // User password (in production, use environment variables!)
  database: "myBookshop", // Name of the database to connect to
  waitForConnections: true, // Queue requests when all connections are in use
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited queued connection requests
});

// Make database connection available globally to all route handlers
global.db = db;

// ==================== Route Configuration ====================
// Load main route handlers (homepage, about, register, etc.)
// This passes the app instance and shopData to the main routes module
require("./routes/main")(app, shopData);

// Load books route handlers and mount them under the '/books' prefix
// All routes defined in books.js will be accessed via /books/*
const booksRouter = require("./routes/books")(shopData);
app.use("/books", booksRouter);

// Load users route handlers and mount them under the '/users' prefix
// All routes defined in users.js will be accessed via /users/*
const usersRouter = require("./routes/users")(shopData);
app.use("/users", usersRouter);

// ==================== Start Server ====================
// Start the Express server and listen for incoming requests
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
