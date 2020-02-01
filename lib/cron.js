var db = require("../models");
var moment = require("moment");
moment().format();
var CronJob = require("cron").CronJob;
var job = new CronJob(
  "* 0 12 * * 5",
  function() {
    db.KitchenInventory.findAll({}).then(function(result) {
      var expiredIngredients = [];
      for (var i = 0; i < result.length; i++) {
        var items = result[i].dataValues;
        console.log(items);
        var expDate = moment(items.expirationDate).format("MM-DD-YYYY");
        if (moment(expDate).isBefore(moment())) {
          expiredIngredients.push(items.ingredient);
        }
      }
      if (expiredIngredients === undefined || expiredIngredients.length === 0) {
        console.log("There are no expired Items");
      } else {
        console.log(
          "Your expired ingredients: " + expiredIngredients.join(", ")
        );
        client.messages
          .create({
            to: "+17202999354",
            from: process.env.TWILIO_TRIAL_NUMBER,
            body: "Your " + array.join(", ") + " are expired"
          })
          .then(function(message) {
            console.log(message.sid);
          });
        expiredIngredients = [];
      }
    });
  },
  null,
  true,
  "America/Denver"
);

module.exports = job;
