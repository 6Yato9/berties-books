// Create a new router
const express = require("express");
const router = express.Router();

router.get("/search", function (req, res, next) {
  res.render("search.ejs");
});

router.get("/search-result", function (req, res, next) {
  //searching in the database
  res.send("You searched for: " + req.query.keyword);
});

app.get("/list", function (req, res, next) {
  let sqlquery = "SELECT * FROM books"; // query database to get all the books

  // Execute SQL query
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("list.ejs", {
      availableBooks: result,
      shopData: shopData,
    });
  });
});
// Route to render addbook.ejs
app.get("/books/addbook", function (req, res) {
  res.render("addbook.ejs", shopData);
});

app.get("/books/bargainbooks", function (req, res) {
  let sqlquery = "SELECT * FROM books WHERE price<20"; // query database to get all the books

  // Execute SQL query
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("bargainlist.ejs", {
      bargainBooks: result,
      shopData: shopData,
    });
  });
});

// Export the router object so index.js can access it
module.exports = router;
