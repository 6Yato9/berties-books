/**
 * Users Routes Module
 *
 * This module handles all user-related functionality including:
 * - User registration with password hashing
 * - User login with password verification
 * - Listing all users
 * - Audit logging for successful and failed login attempts
 */

// Import required modules
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Configuration for bcrypt
const saltRounds = 10;

// ==================== Middleware ====================

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

/**
 * Export a function that configures and returns the router
 * @param {Object} shopData - Shop information to pass to templates
 * @returns {Router} Configured Express router
 */
module.exports = function (shopData) {
  // ==================== Registration Routes ====================

  /**
   * Route: Registration Form (/users/register)
   * Method: GET
   * Purpose: Display user registration form
   */
  router.get("/register", function (req, res, next) {
    res.render("register.ejs", { shopData: shopData });
  });

  /**
   * Route: Handle Registration (/users/registered)
   * Method: POST
   * Purpose: Process registration form, hash password, and save to database
   * Form Data: username, first, last, email, password
   */
  router.post("/registered", function (req, res, next) {
    // Extract password from request body
    const plainPassword = req.body.password;

    // Hash the password before storing it in the database
    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
        return;
      }

      // SQL query to insert new user into database
      let sqlquery =
        "INSERT INTO users (username, first_name, last_name, email, hashedPassword) VALUES (?,?,?,?,?)";

      // Create array with form data including hashed password
      let newUser = [
        req.body.username,
        req.body.first,
        req.body.last,
        req.body.email,
        hashedPassword,
      ];

      // Execute database query to save user
      db.query(sqlquery, newUser, (err, result) => {
        if (err) {
          next(err);
        } else {
          // Send success message with user details (including password for debugging)
          let responseMessage =
            "Hello " +
            req.body.first +
            " " +
            req.body.last +
            " you are now registered! ";
          responseMessage +=
            "We will send an email to you at " + req.body.email + ". ";
          responseMessage +=
            "Your password is: " +
            req.body.password +
            " and your hashed password is: " +
            hashedPassword;
          res.send(responseMessage);
        }
      });
    });
  });

  // ==================== User Listing Routes ====================

  /**
   * Route: List All Users (/users/list)
   * Method: GET
   * Purpose: Display all registered users (without passwords)
   * Access Control: Requires user to be logged in (redirectLogin middleware)
   */
  router.get("/list", redirectLogin, function (req, res, next) {
    // SQL query to retrieve all users (excluding password field)
    let sqlquery = "SELECT username, first_name, last_name, email FROM users";

    // Execute database query
    db.query(sqlquery, (err, result) => {
      if (err) {
        next(err);
      } else {
        // Render list page with user data
        res.render("listusers.ejs", {
          users: result,
          shopData: shopData,
        });
      }
    });
  });

  // ==================== Login Routes ====================

  /**
   * Route: Login Form (/users/login)
   * Method: GET
   * Purpose: Display login form
   */
  router.get("/login", function (req, res, next) {
    res.render("login.ejs", { shopData: shopData });
  });

  /**
   * Route: Process Login (/users/loggedin)
   * Method: POST
   * Purpose: Verify username and password, log audit trail
   * Form Data: username, password
   */
  router.post("/loggedin", function (req, res, next) {
    const username = req.body.username;
    const plainPassword = req.body.password;

    // SQL query to retrieve user's hashed password from database
    let sqlquery = "SELECT hashedPassword FROM users WHERE username = ?";

    // Execute database query
    db.query(sqlquery, [username], (err, result) => {
      if (err) {
        next(err);
        return;
      }

      // Check if user exists
      if (result.length === 0) {
        // User not found - log failed attempt
        logAuditTrail(username, false, "User not found");
        res.send("Login failed: Invalid username or password");
        return;
      }

      // Get the hashed password from database
      const hashedPassword = result[0].hashedPassword;

      // Compare the supplied password with the hashed password
      bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
        if (err) {
          next(err);
          return;
        }

        if (result === true) {
          // Password matches - successful login
          // Save user session here, when login is successful
          req.session.userId = req.body.username;
          logAuditTrail(username, true, "Successful login");
          res.send("Login successful! Welcome " + username + "!");
        } else {
          // Password doesn't match - failed login
          logAuditTrail(username, false, "Incorrect password");
          res.send("Login failed: Invalid username or password");
        }
      });
    });
  });

  // ==================== Audit Logging ====================

  /**
   * Helper Function: Log Audit Trail
   * Purpose: Store login attempts (successful and failed) in audit table
   * @param {string} username - Username attempting to log in
   * @param {boolean} success - Whether login was successful
   * @param {string} message - Additional details about the login attempt
   */
  function logAuditTrail(username, success, message) {
    let sqlquery =
      "INSERT INTO audit_log (username, success, message, timestamp) VALUES (?,?,?,NOW())";
    let auditData = [username, success, message];

    db.query(sqlquery, auditData, (err, result) => {
      if (err) {
        console.error("Error logging audit trail:", err);
      }
    });
  }

  /**
   * Route: Audit Log (/users/audit)
   * Method: GET
   * Purpose: Display complete audit history of login attempts
   * Access Control: Requires user to be logged in (redirectLogin middleware)
   */
  router.get("/audit", redirectLogin, function (req, res, next) {
    // SQL query to retrieve all audit log entries, most recent first
    let sqlquery = "SELECT * FROM audit_log ORDER BY timestamp DESC";

    // Execute database query
    db.query(sqlquery, (err, result) => {
      if (err) {
        next(err);
      } else {
        // Render audit page with log data
        res.render("audit.ejs", {
          auditLog: result,
          shopData: shopData,
        });
      }
    });
  });

  // Return the configured router to be mounted in the main app
  return router;
};
