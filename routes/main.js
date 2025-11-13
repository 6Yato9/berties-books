/**
 * Main Routes Module
 * 
 * This module defines the core application routes including:
 * - Homepage
 * - About page
 * - User registration
 * - Book addition functionality
 * 
 * All routes are attached directly to the Express app instance
 */

module.exports = function (app, shopData) {
  // ==================== GET Routes ====================
  
  /**
   * Route: Homepage (/)
   * Method: GET
   * Purpose: Display the main landing page with navigation links
   */
  app.get("/", function (req, res) {
    res.render("index.ejs", { shopData: shopData });
  });
  
  /**
   * Route: About Page (/about)
   * Method: GET
   * Purpose: Display information about the bookshop
   */
  app.get("/about", function (req, res) {
    res.render("about.ejs", { shopData: shopData });
  });

  /**
   * Route: Registration Form (/register)
   * Method: GET
   * Purpose: Display the user registration form
   */
  app.get("/register", function (req, res) {
    res.render("register.ejs", { shopData: shopData });
  });
  
  // ==================== POST Routes ====================
  
  /**
   * Route: Handle Registration (/registered)
   * Method: POST
   * Purpose: Process user registration form submission
   * Form Data: first, last, email
   * Response: Confirmation message with user details
   */
  app.post("/registered", function (req, res) {
    // In a real application, this would save to a database
    // For now, we just display a confirmation message
    res.send(
      " Hello " +
        req.body.first +
        " " +
        req.body.last +
        " you are now registered!  We will send an email to you at " +
        req.body.email
    );
  });

  /**
   * Route: Add Book to Database (/bookadded)
   * Method: POST
   * Purpose: Insert a new book into the database
   * Form Data: name (book title), price (book price)
   * Response: Confirmation message with book details
   */
  app.post("/bookadded", function (req, res, next) {
    // SQL query with placeholders (?) to prevent SQL injection
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";

    // Create array with form data to safely insert into query
    let newrecord = [req.body.name, req.body.price];

    // Execute the database query
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        // Pass error to Express error handler
        next(err);
      } else {
        // Send success message back to user
        res.send(
          "This book is added to database, name: " +
            req.body.name +
            " price: £" +
            req.body.price
        );
      }
    });
  });
};
