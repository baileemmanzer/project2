var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
      // validate: {
      //   isphone: true
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.beforeCreate(function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasOne(models.ShoppingList, {
      onDelete: "cascade"
    });
    User.hasOne(models.KitchenInventory, {
      onDelete: "cascade"
    });
  };
  //creates the table
  return User;
};
