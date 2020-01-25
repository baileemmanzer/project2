// require("dotenv").config();
// var keys = require("../keys.js");
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken);
var client = require("twilio")(accountSid, authToken);

module.exports = client;

// client.messages
//   .create({
//     to: "+17202999354",
//     from: process.env.TWILIO_TRIAL_NUMBER,
//     body: "This is the ship that made the kessel run in less than 12 parsecs"
//   })
//   .then(function(message) {
//     console.log(message.sid);
//   });
