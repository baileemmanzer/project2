// Twilio setup
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken);
var client = require("twilio")(accountSid, authToken);
module.exports = client;
