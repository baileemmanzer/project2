var db = require("../models");
var unirest = require("unirest");
var apiKey = process.env.SPOONACULAR_API;

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/find-recipes", function(req, res) {
    db.KitchenInventory.findAll({}).then(function(result) {
      console.log(result);
      res.render("find-recipes", { ingredients: result });
    });
  });
  // Load example page and pass in an example by id
  app.get("/recipes/:ingredients", function(req, res) {
    var ingredients = req.params.ingredients;
    var queryUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=" +
      ingredients;

    unirest
      .get(queryUrl)
      .header("X-RapidAPI-Key", apiKey)
      .end(function(result) {
        if (result.status === 200) {
          //console.log(result.body);
          res.render("recipes", { recipe: result.body });
        } else {
          res.render("404");
          console.log("this is the end");
        }
      });
  });
  app.get("/view-recipe/:id", function(req, res) {
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
          console.log(result.body);
          res.render("recipes", { viewRecipe: result.body });
        } else {
          res.render("404");
          console.log("This is the end");
        }
      });
  });

  app.get("/expired-items", function(req, res) {
    db.Expiring.findAll({}).then(function(result) {
      res.render("expiring", { expiringItems: result });
    });
  });

  app.get("/my-fridge", function(req, res) {
    db.KitchenInventory.findAll({}).then(function(result) {
      console.log(result);
      res.render("my-fridge", { ingredients: result });
    });
  });

  app.get("/shopping-list", function(req, res) {
    db.ShoppingList.findAll({}).then(function(result) {
      console.log(result);
      res.render("shopping-list", { ingredients: result });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
