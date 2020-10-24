/* Requiring our models */
var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        if (req.user) {
            console.log(`user privilege ${req.user.admin}`);
            res.render("dashboard", {
                user: req.user.userName,
                privilege: req.user.admin
            });
        }
        res.render("index", {
            urlLogin: "/login",
            urlSignUp: "/signup"
        });

    });

    // Loads the login page for active users
    app.get("/login", function(req, res) {
        console.log(req.user);
        if (req.user) {
            console.log(`user privilege ${req.user.admin}`);
            res.render("dashboard", {
                user: req.user.userName,
                privilege: req.user.admin
            });
        }
        res.render("login");
    });

    // Loads the sign up form page for creating new users
    app.get("/signup", function(req, res) {
        res.render("signup");
    });

    // Send users authorized to the protected route using the middleware function
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/dashboard", isAuthenticated, function(req, res) {
        console.log(req.user);
        res.render("dashboard", {
            user: req.user.userName,
            privilege: req.user.admin
        });
    });

    // Load example page and pass in an example by id
    /*   app.get("/example/:id", function(req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function(
          dbExample
        ) {
          res.render("example", {
            example: dbExample,
          });
        });
      }); */

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};