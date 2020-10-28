module.exports = function(sequelize, DataTypes) {
    var shoppinglist = sequelize.define("shoppinglist", {
        //Give our list a name
        listName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //Allow admin users to delegate this list to a specific user. This field is a foreing key, because is reference.
        // Read the sequelize documentation here about reference
        // https://sequelize.org/master/manual/model-basics.html
        /* This is a reference to the user model */
        //The primary key in the other model to reference
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        //Mark the status of the shopping list completed / not completed true / false
        completeTask: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    return shoppinglist;
};