module.exports = function(sequelize, DataTypes) {
  var KitchenInventory = sequelize.define(
    "KitchenInventory",
    {
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
      },
      expirationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          len: [1]
        }
      },
      freqency: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          len: [1]
        }
      }
    },
    {
      freezeTableName: true
    }
  );
  return KitchenInventory;
};
