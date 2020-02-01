var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: "true"
  }), function (req, res) {
    res.json("/recipes");
  });
  //Route for signing up a user. If user is created successfully, go to log in, otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
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
    req.logout();
    res.redirect("/");
  });

  app.post("/api/kitcheninventory", function(req, res) {
    db.KitchenInventory.create({...req.body, UserId: req.user.id}).then(function(newItem) {
      res.json(newItem);
    });
  });
};
// Get all examples
// app.get("/api/examples", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.json(dbExamples);
//   });
// });

// // Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//     res.json(dbExample);
//   });
// });
