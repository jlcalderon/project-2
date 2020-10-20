module.exports = function(sequelize, DataTypes) {
    var listdetails = sequelize.define("listdetails", {
        //Links the details of a shopping list
        idList: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        //Links the inventory to retrieve the data from
        idItem: {
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