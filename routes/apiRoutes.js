var db = require("../models");
var passport = require("..config/passport.js");

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
module.exports = function(app) {
  //Passport login
  app.post(
    "public/index.html",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "public/index.html",
      failureFlash: true
    })
  );
  //Passport registry
