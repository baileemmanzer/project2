module.exports = function(sequelize, DataTypes) {
  var KitchenInventory = sequelize.define("Kitchen Inventory", {
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
      },
      expirationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          len: [1]
        }
      },
      frequency: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          len: [1]
        }
      }
    }
  });
  KitchenInventory.associate = function(models) {
    // We're saying that Kitchen Inventory belongs to a user
    // Kitchen Inventory can't exist without a user due to the foreign key constraint
    KitchenInventory.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  //syncs with DB
  // KitchenInventory.sync();
  //creates the table
  return KitchenInventory;
};
