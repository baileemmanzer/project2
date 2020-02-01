var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: "true"
  }), (req, res) => {
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

  app.post("/api/kitcheninventory", function(req, res) {
    db.KitchenInventory.create({...req.body, UserId: req.user.id}).then(function(newItem) {
      console.log(req.body);
      res.json(newItem);
    });
  });
  
  app.post("/api/shoppinglist", function(req, res) {
    db.ShoppingList.create({...req.body, UserId: req.user.id}).then(function(newItem) {
      console.log(req.body);
      res.json(newItem);
    });
  });

  app.delete("/api/kitcheninventory/:id", function(req, res) {
    db.KitchenInventory.destroy({where: {id: req.params.id } }).then(function(deleted){
      res.json(deleted)
    })
  })
};
