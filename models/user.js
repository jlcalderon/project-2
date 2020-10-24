// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        // The users name set up when sign up
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The email cannot be null, and must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //Control what users can do in the app I users are admin they have all granted access to create shopping lists and update Inventory.
        //if they are not admin they can only Complete Shopping lists.
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        //control users status online/offline
        status: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    user.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    user.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return user;
};