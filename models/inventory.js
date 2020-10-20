module.exports = function(sequelize, DataTypes) {
  var inventory = sequelize.define("inventory", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   allowNull: false
    // },
    categoryName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    itemName: {
      type: DataTypes.STRING(100),
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

    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    // eslint-disable-next-line camelcase
    supplierName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  });
  return inventory;
};
