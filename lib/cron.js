var db = require("../models");
var moment = require("moment");
moment().format();
var CronJob = require("cron").CronJob;

// Loop through each User

// for each User, run through the inventory and then find each expired ingredients
// pushed into a array
// Once that's done, run function to se

// "* 0 12 * * 5",

var job = new CronJob(
  "* * * * * *",
  function() {
    db.KitchenInventory.findAll({
      where: {
        expirationDate: {
          $lte: moment()
            .format("MM-DD-YYYY")
            .toDate()
        }
      },
      include: [db.User],
      group: ["KitchenInventory.UserId"]
    }).then(function(result) {
      console.log(result);
      console.log("Expired items in your kitchen: " + result);
      //   client.messages
      //     .create({
      //       to: result.User.phone,
      //       from: process.env.TWILIO_TRIAL_NUMBER,
      //       body: "Your " + array.join(", ") + " are expired"
      //     })
      //     .then(function(message) {
      //       console.log(message.sid);
      //     });
    });
  },
  null,
  true,
  "America/Denver"
);

module.exports = job;

//   db.KitchenInventory.findAll({}).then(function(result) {
//     for (var i = 0; i < result.length; i++) {
//       var expiredIngredients = [];
//       var item = result[i].dataValues;
//       console.log(item);
//       var expDate = moment(item.expirationDate).format("MM-DD-YYYY");
//       if (moment(expDate).isBefore(moment())) {
//         expiredIngredients.push(item.ingredient);
//       }
//     }
//     if (expiredIngredients === undefined || expiredIngredients.length === 0) {
//       console.log("There are no expired items");
//     } else {
//       console.log(
//         "Your expired ingredients: " + expiredIngredients.join(", ")
//       );
//       db.User.findOne({where: })
//       client.messages
//         .create({
//           to: "+17202999354",
//           from: process.env.TWILIO_TRIAL_NUMBER,
//           body: "Your " + array.join(", ") + " are expired"
//         })
//         .then(function(message) {
//           console.log(message.sid);
//         });
//       expiredIngredients = [];
//     }
//   });
