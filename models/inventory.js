module.exports = function(sequelize, DataTypes) {
    var inventory = sequelize.define("inventory", {
        //swapped itemName and category
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        replenishFlag: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        //changed the data type to have real prices example: 5.99
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        // eslint-disable-next-line camelcase
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return inventory;
};