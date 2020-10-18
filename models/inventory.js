module.exports = function(sequelize, DataTypes) {
  var inventory = sequelize.define("inventory", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   allowNull: false
    // },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
     item_name: {
       type: DataTypes.STRING(100),
       allowNull: false
     },

     quantity: {
       type: DataTypes.INTEGER,
       allowNull: false
     },

     price: {
       type: DataTypes.INTEGER,
       allowNull: true
     },

     supplier_Name: {
       type: DataTypes.STRING(100),
       allowNull: false

     }


  });
  return inventory;
};
