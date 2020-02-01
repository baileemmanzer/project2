//Passport.js
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "phone"
    },
    function(phone, password, done) {
      db.User.findOne({
        where: {
          phone: phone
        }
      }).then(function(user) {
        if (!user) {
          return done(null, false, { message: "Incorrect phone number." });
        } else if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

//Required for storing user info into session
passport.serializeUser(function(user, done) {
  done(null, user);
});

//Required for retrieving user from session
passport.deserializeUser(function(obj, done) {
  //User should be queried against db
  //Using the ID
  done(null, obj);
});

module.exports = passport;
