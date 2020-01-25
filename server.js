require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

// for twilio later
// var client = require("./lib/twilio.js");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// Dont uncomment this code or it will send a text message using our trial dollars
// client.messages
//   .create({
//     to: "",
//     from: process.env.TWILIO_TRIAL_NUMBER,
//     body:
//       "Your ---placeholder--- will expire in 2 days, would you like to add it to your shopping list?"
//   })
//   .then(function(message) {
//     console.log(message.sid);
//   });

module.exports = app;
