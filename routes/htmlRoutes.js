var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      urlLogin: "/login",
      urlSignUp: "/signup"
    });
  });

  // Loads the login page for active users
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Loads the sign up form page for creating new users
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  //  Loads the Inventory in Home page
  app.get("/inventory", function(req, res) {
    db.inventory.findAll({}).then(function(dbinventory) {
      res.render("inventory", {
        inv: dbinventory
      });
    });
  });

  //  Loads the Inventory in Home page
  app.get("/inventory/:id", function(req, res) {
    db.inventory
      .findOne({ where: { id: req.params.id } })
      .then(function(dbinventory) {
        res.render("inventory", {
          item: dbinventory
        });
      });
  });

  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
