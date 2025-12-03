/**
 * API Routes Module
 *
 * This module provides RESTful API endpoints for external access to bookshop data.
 * All endpoints return data in JSON format for machine-readable consumption.
 *
 * Features:
 * - List all books
 * - Search books by keyword
 * - Filter books by price range
 * - Sort results by name or price
 */

const express = require("express");
const router = express.Router();

module.exports = function (shopData) {
  const db = global.db;

  /**
   * Route: API - Get Books (/api/books)
   * Method: GET
   * Purpose: Return list of books in JSON format for external API consumption
   *
   * Query Parameters:
   * - search: Filter books by name containing this keyword (optional)
   * - minprice: Filter books with price >= this value (optional)
   * - max_price: Filter books with price <= this value (optional)
   * - sort: Sort results by 'name' or 'price' (optional)
   *
   * Returns: JSON array of book objects with id, name, and price
   *
   * Examples:
   * - /api/books - Get all books
   * - /api/books?search=world - Search for books containing 'world'
   * - /api/books?minprice=5&max_price=10 - Books priced between £5 and £10
   * - /api/books?sort=name - Sort by name alphabetically
   * - /api/books?sort=price - Sort by price ascending
   * - /api/books?search=farm&minprice=10&sort=price - Combined filters
   */
  router.get("/books", function (req, res, next) {
    // Start with base query
    let sqlquery = "SELECT * FROM books";
    let conditions = [];
    let params = [];

    // Add search filter if provided
    if (req.query.search) {
      conditions.push("name LIKE ?");
      params.push("%" + req.query.search + "%");
    }

    // Add minimum price filter if provided
    if (req.query.minprice) {
      conditions.push("price >= ?");
      params.push(parseFloat(req.query.minprice));
    }

    // Add maximum price filter if provided
    if (req.query.max_price) {
      conditions.push("price <= ?");
      params.push(parseFloat(req.query.max_price));
    }

    // Add WHERE clause if there are any conditions
    if (conditions.length > 0) {
      sqlquery += " WHERE " + conditions.join(" AND ");
    }

    // Add ORDER BY clause if sort parameter is provided
    if (req.query.sort) {
      if (req.query.sort === "name") {
        sqlquery += " ORDER BY name ASC";
      } else if (req.query.sort === "price") {
        sqlquery += " ORDER BY price ASC";
      }
    }

    // Execute database query
    db.query(sqlquery, params, (err, result) => {
      if (err) {
        // Pass error to Express error handler
        next(err);
      } else {
        // Return results as a JSON object
        res.json(result);
      }
    });
  });

  return router;
};
