/**
 * Books Routes Module
 *
 * This module defines all book-related routes using Express Router.
 * All routes are mounted under the '/books' prefix in the main application.
 *
 * Routes included:
 * - Search functionality (form and results)
 * - List all books
 * - Add new book form
 * - List bargain books (under £20)
 */

// Create a new Express Router instance
const express = require("express");
const router = express.Router();

/**
 * Middleware: redirectLogin
 * Purpose: Redirect to login page if user is not logged in
 * Usage: Add as middleware to routes that require authentication
 */
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("../users/login"); // redirect to the login page
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
  // ==================== Search Routes ====================

  /**
   * Route: Search Form (/books/search)
   * Method: GET
   * Purpose: Display the book search form
   */
  router.get("/search", function (req, res, next) {
    res.render("search.ejs", { shopData: shopData });
  });

  /**
   * Route: Search Results (/books/search-result)
   * Method: GET
   * Purpose: Display books matching the search keyword
   * Query Params: keyword - The search term entered by user
   * Features: Case-insensitive partial matching using SQL LIKE
   */
  router.get("/search-result", function (req, res, next) {
    // SQL query for case-insensitive partial matching
    // LOWER() converts both the column and search term to lowercase
    let searchQuery = "SELECT * FROM books WHERE LOWER(name) LIKE LOWER(?)";

    // Wrap keyword with % wildcards for partial matching
    // e.g., 'world' becomes '%world%' to match 'Brave New World'
    let keyword = `%${req.query.keyword}%`;

    // Execute database search
    db.query(searchQuery, [keyword], (err, result) => {
      if (err) {
        // Pass error to Express error handler
        next(err);
      }
      // Render results page with matching books
      res.render("searchresults.ejs", {
        books: result,
        shopData: shopData,
        keyword: req.query.keyword, // Pass original keyword for display
      });
    });
  });

  // ==================== Book Listing Routes ====================

  /**
   * Route: List All Books (/books/list)
   * Method: GET
   * Purpose: Display complete inventory of all books in database
   */
  router.get("/list", function (req, res, next) {
    // SQL query to retrieve all books from database
    let sqlquery = "SELECT * FROM books";

    // Execute the database query
    db.query(sqlquery, (err, result) => {
      if (err) {
        // Pass error to Express error handler
        next(err);
      }
      // Render list template with all books
      res.render("list.ejs", {
        availableBooks: result,
        shopData: shopData,
      });
    });
  });

  /**
   * Route: Add Book Form (/books/addbook)
   * Method: GET
   * Purpose: Display form for adding a new book to the database
   * Access Control: Requires user to be logged in (redirectLogin middleware)
   */
  router.get("/addbook", redirectLogin, function (req, res) {
    res.render("addbook.ejs", { shopData: shopData });
  });

  /**
   * Route: Bargain Books (/books/bargainbooks)
   * Method: GET
   * Purpose: Display books priced under £20
   * SQL: Uses WHERE clause to filter by price
   */
  router.get("/bargainbooks", function (req, res, next) {
    // SQL query to find books with price less than £20
    let sqlquery = "SELECT * FROM books WHERE price < 20";

    // Execute the database query
    db.query(sqlquery, (err, result) => {
      if (err) {
        // Pass error to Express error handler
        next(err);
      }
      // Render bargain books template
      res.render("bargainlist.ejs", {
        bargainBooks: result,
        shopData: shopData,
      });
    });
  });

  // Return the configured router to be mounted in the main app
  return router;
};
