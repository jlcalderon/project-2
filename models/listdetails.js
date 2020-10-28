module.exports = function(sequelize, DataTypes) {
    var listdetails = sequelize.define("listdetails", {
        //Links the details of a shopping list. This field is a foreing key, because is reference.
        // Read the sequelize documentation here about reference
        // https://sequelize.org/master/manual/model-basics.html
        /* This is a reference to the shoppinglist model */
        shoppinglistId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        //Links the inventory to retrieve the data from
        /* This is a reference to the inventory model */
        //The primary key in the other model to reference
        inventoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantityObtained: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        },
        //Mark the status of the item on list obtained / not obtained true / false
        status: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });
    return listdetails;
};