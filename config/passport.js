//Passport.js
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(
  new LocalStrategy(function(username, password, done) {
    db.User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

//Required for storing user info into session
passport.serializeUser(function(user, done) {
  done(null, user);
});

//Required for retrieving user from session
passport.deserializeUser(function(id, done) {
  //User should be queried against db
  //Using the ID
  done(null, user);
});

module.exports = passport;
