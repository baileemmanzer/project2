var db = require("../models");
var moment = require("moment");
moment().format();
var CronJob = require("cron").CronJob;
var client = require("./twilio");

var job = new CronJob(
  // "* 0 12 * * 5",
  "* 0 12 * * 5",
  function() {
    db.User.findAll({}).then(function(users) {
      users.forEach(function(user) {
        console.log(user.dataValues.phone);
        db.KitchenInventory.findAll({
          where: { UserId: user.dataValues.id }
        }).then(function(items) {
          var expiredItems = [];
          items.forEach(function(item) {
            var expDate = moment(item.expirationDate).format("MM-DD-YYYY");
            if (moment(expDate).isBefore(moment())) {
              expiredItems.push(item.ingredient);
            }
          });
          console.log(expiredItems);
          if (expiredItems === undefined || expiredItems.length === 0) {
            console.log("There are no expired items this week");
          } else {
            client.messages
              .create({
                to: user.phone,
                from: process.env.TWILIO_TRIAL_NUMBER,
                body: "Your Weekly Expired Items: " + expiredItems.join(", ")
              })
              .then(function(message) {
                console.log(message.sid);
              });
          }
        });
      });
    });
  },
  null,
  true,
  "America/Denver"
);

module.exports = job;
