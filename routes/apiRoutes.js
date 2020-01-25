var db = require("../models");
var passport = require("..config/passport.js");

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
