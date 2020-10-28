var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
    // Our user will sign in using an username
    {
        usernameField: "userName"
    },
    function(userName, password, done) {
        // When a user tries to sign in this code runs
        db.user.findOne({
            where: {
                userName: userName
            }
        }).then(function(dbUser) {
            // If there's no user with the given name
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect user name."
                });
            }
            // If there is a user with the given name, but the password the user gives us is incorrect
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(userid, cb) {
    db.user.findOne({
            where: {
                id: userid
            }
        })
        .then((user) => {
            cb(null, user);
        })
        .catch(err => cb(err))
});

// Exporting our configured passport
module.exports = passport;