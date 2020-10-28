/* Requiring our models */
var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    /****************** RENDERS INDEX PAGE *******************/
    // Load index page
    app.get("/", function(req, res) {
        res.render("index", {
            urlLogin: "/login",
            urlSignUp: "/signup"
        });

    });

    /****************** RENDERS LOGIN SCREEN *******************/
    // Loads the login page for active users
    app.get("/login", function(req, res) {
        console.log(req.user);
        res.render("login");
    });


    /****************** RENDER SIGNUP SCREEN *******************/
    // Loads the sign up form page for creating new users
    app.get("/signup", function(req, res) {
        res.render("signup");
    });

    /****************** RENDER DASHBOARD BY USERS *******************/
    // Send users authorized to the protected route using the middleware function
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/dashboard", isAuthenticated, function(req, res) {
        console.log(req.user);
        db.inventory.findAll({}).then(function(dbinventory) {
            res.render("dashboard", {
                user: req.user.userName,
                privilege: req.user.admin,
                inv: dbinventory
            });
        });
    });


    /****************** RENDER SHOPINGLIST BY USERS *******************/
    //Send users to see thier shopping list assignments
    app.get("/shoppinglist", isAuthenticated, function(req, res) {
        console.log(req.user);
        db.shoppinglist.findAll({
            include: [{
                model: db.listdetails,
                include: [{
                    model: db.inventory
                }]
            }],
            where: {
                userId: req.user.id
            }
        }).then(function(shoppingListResults) {
            res.render("shoppinglist", {
                shoppinglists: shoppingListResults
            });
        });
    });

    /****************** RENDERS 404 FRIENDLY SCREEN IF THE ROUT WASN'T FOUND *******************/
    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
}