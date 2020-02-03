// Requirements
var db = require("../models");
var unirest = require("unirest");
var apiKey = process.env.SPOONACULAR_API;
var moment = require("moment");
var isAuthenticated = require("../lib/isAuthenticated");
moment().format();

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load recipes page
  app.get("/find-recipes", isAuthenticated, function(req, res) {
    db.KitchenInventory.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(result) {
      res.render("find-recipes", {
        ingredients: result,
        style: "find-recipes.css"
      });
    });
  });

  // Load recipes page while taking in ingredients
  app.get("/recipes/:ingredients", isAuthenticated, function(req, res) {
    var ingredients = req.params.ingredients;
    var queryUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ingredients=" +
      ingredients;

    unirest
      .get(queryUrl)
      .header("X-RapidAPI-Key", apiKey)
      .end(function(result) {
        if (result.status === 200) {
          //console.log(result.body);
          res.render("recipes", {
            recipe: result.body,
            style: "view-recipe.css"
          });
        } else {
          res.render("404");
          console.log("this is the end");
        }
      });
  });

  // Load view recipe page while taking in a recipe id
  app.get("/view-recipe/:id", isAuthenticated, function(req, res) {
    id = req.params.id;
    var queryUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
      id +
      "/information";
    unirest
      .get(queryUrl)
      .header("X-RapidAPI-Key", apiKey)
      .end(function(result) {
        if (result.status === 200) {
          res.render("recipes", {
            viewRecipe: result.body,
            style: "selected-recipe.css"
          });
        } else {
          res.render("404");
          console.log("This is the end");
        }
      });
  });

  // Load the expired items page
  app.get("/expired-items", isAuthenticated, function(req, res) {
    db.KitchenInventory.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(result) {
      var expiredIngredients = [];
      for (var i = 0; i < result.length; i++) {
        var items = result[i].dataValues;
        var expDate = moment(items.expirationDate).format("MM-DD-YYYY");
        if (moment(expDate).isBefore(moment())) {
          expiredIngredients.push(items);
        }
      }
      res.render("expired-items", {
        expiredItems: expiredIngredients,
        style: "expired-items.css"
      });
    });
  });

  // Load the my fridge page
  app.get("/my-fridge", isAuthenticated, function(req, res) {
    db.KitchenInventory.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(result) {
      res.render("my-fridge", { ingredients: result });
    });
  });

  // Load the shopping list page
  app.get("/shopping-list", isAuthenticated, function(req, res) {
    db.ShoppingList.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(result) {
      console.log(result);
      res.render("shopping-list", {
        ingredients: result,
        style: "shopping-list.css"
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
