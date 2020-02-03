// Requirements
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Login Route
  app.post("/api/login", passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: "true"
  }), function(req, res) {
    res.json("/my-fridge");
  });

  //Route for signing up a user. If user is created successfully, go to log in, otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      phone: req.body.phone,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  //Route to log user out
  app.get("/logout", function(req, res) {
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });

  // Route for new kitchen inventory items
  app.post("/api/kitcheninventory", function(req, res) {
    db.KitchenInventory.create({...req.body, UserId: req.user.id}).then(function(newItem) { 
      console.log(req.body);
      res.json(newItem);
    });
  });
  
  // Route for new shopping list items
  app.post("/api/shoppinglist", function(req, res) {
    db.ShoppingList.create({...req.body, UserId: req.user.id}).then(function(newItem) {
      console.log(req.body);
      res.json(newItem);
    });
  });

  // Route for deleting item from kitchen inventory
  app.delete("/api/kitcheninventory/:id", function(req, res) {
    db.KitchenInventory.destroy({where: {id: req.params.id } }).then(function(deleted){
      res.json(deleted)
    });
  });

  app.post("/api/move-expired-to-shopping/:id", function(req, res) {
    db.ShoppingList.create({...req.body, UserId: req.user.id}).then(function(newShopItem) {
      console.log("expired item moved to shopping list");
      res.json(newShopItem);
    });
    db.KitchenInventory.destroy({where: {id: req.params.id} }).then(function(deleted){
      console.log("Id: " + deleted + " was removed from kitchen inventory");
    });
  });

  app.post("/api/move-fridge-to-shopping/:id", function(req, res) {
    db.ShoppingList.create({...req.body, UserId: req.user.id}).then(function(newShopItem) {
      console.log("expired item moved to shopping list");
      res.json(newShopItem);
    });
    db.KitchenInventory.destroy({where: {id: req.params.id} }).then(function(deleted){
      console.log("Id: " + deleted + " was removed from kitchen inventory");
    });
  });

  app.post("/api/move-shopping-to-fridge/:id", function(req, res) {
    db.KitchenInventory.create({... req.body, UserId: req.user.id}).then(function(newFridgeItem) {
      console.log("New item from shopping list added to kitchen inventory");
      res.json(newFridgeItem);
    });
    db.ShoppingList.destroy({where: {id: req.params.id} }).then(function(deleted) {
      console.log("Id: " + deleted + "was removed from shopping list");
    });
  });
};
