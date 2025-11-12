module.exports = function (app, shopData) {
  // Handle our routes
  app.get("/", function (req, res) {
    res.render("index.ejs", shopData);
  });
  app.get("/about", function (req, res) {
    res.render("about.ejs", shopData);
  });
  app.get("/search", function (req, res) {
    res.render("search.ejs", shopData);
  });
  app.get("/search-result", function (req, res, next) {
    let searchQuery = "SELECT * FROM books WHERE LOWER(name) LIKE LOWER(?)";
    let keyword = `%${req.query.keyword}%`; // wrap keyword with wildcards

    //searching in the database
    db.query(searchQuery, [keyword], (err, result) => {
      if (err) {
        next(err);
      }
      res.render("searchresults.ejs", {
        books: result,
        shopData: shopData,
        keyword: req.query.keyword,
      });
    });
  });
  app.get("/register", function (req, res) {
    res.render("register.ejs", shopData);
  });
  app.post("/registered", function (req, res) {
    // saving data in database
    res.send(
      " Hello " +
        req.body.first +
        " " +
        req.body.last +
        " you are now registered!  We will send an email to you at " +
        req.body.email
    );
  });
  // Route to render list.ejs

  // Route to handle form submission for adding a new book to the database
  app.post("/bookadded", function (req, res, next) {
    // Saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";

    // Execute SQL query
    let newrecord = [req.body.name, req.body.price];

    // Send data to database if no error
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send(
          "This book is added to database, name: " +
            req.body.name +
            " price: £" +
            req.body.price
        );
      }
    });
  });
  // Route to show list of bargain books
};
