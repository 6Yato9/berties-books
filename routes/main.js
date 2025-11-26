/**
 * Main Routes Module
 *
 * This module defines the core application routes including:
 * - Homepage
 * - About page
 * - User registration
 * - Book addition functionality
 * - User logout
 *
 * All routes are attached directly to the Express app instance
 */

/**
 * Middleware: redirectLogin
 * Purpose: Redirect to login page if user is not logged in
 * Usage: Add as middleware to routes that require authentication
 */
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("./login"); // redirect to the login page
  } else {
    next(); // move to the next middleware function
  }
};

module.exports = function (app, shopData) {
  // ==================== GET Routes ====================

  /**
   * Route: Homepage (/)
   * Method: GET
   * Purpose: Display the main landing page with navigation links
   * Session Data: Passes isLoggedIn status to view for conditional UI rendering
   */
  app.get("/", function (req, res) {
    res.render("index.ejs", {
      shopData: shopData,
      isLoggedIn: !!req.session.userId,
    });
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
   * Route: Logout (/logout)
   * Method: GET
   * Purpose: Destroy user session and log them out
   * Access Control: Requires user to be logged in (redirectLogin middleware)
   */
  app.get("/logout", redirectLogin, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("./");
      }
      res.send('you are now logged out. <a href="+./+">Home</a>');
    });
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
   * Security: Sanitizes input to prevent XSS attacks
   */
  app.post("/bookadded", function (req, res, next) {
    // Sanitize input fields to prevent XSS attacks
    const sanitizedName = req.sanitize(req.body.name);
    const sanitizedPrice = req.sanitize(req.body.price);

    // SQL query with placeholders (?) to prevent SQL injection
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";

    // Create array with sanitized form data to safely insert into query
    let newrecord = [sanitizedName, sanitizedPrice];

    // Execute the database query
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        // Pass error to Express error handler
        next(err);
      } else {
        // Send success message back to user (using sanitized values)
        res.send(
          "This book is added to database, name: " +
            sanitizedName +
            " price: £" +
            sanitizedPrice
        );
      }
    });
  });
};
