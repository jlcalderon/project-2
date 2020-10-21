module.exports = function(sequelize, DataTypes) {
  var shoppinglist = sequelize.define("shoppinglist", {
    //Give our list a name
    listName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //Allow users to delegate this list to a specific user
    idUser: {
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
