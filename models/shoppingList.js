module.exports = function(sequelize, DataTypes) {
  var ShoppingList = sequelize.define("ShoppingList", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  ShoppingList.associate = function(models) {
    ShoppingList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  //syncs with DB
  ShoppingList.sync();
  //creates the table
  return ShoppingList;
};
