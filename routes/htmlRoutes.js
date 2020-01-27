var db = require("../models");
var unirest = require("unirest");

// Requiring path so we can use relative routes to our HTML files
var path = require("path");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get(`/`, function(req,res) {
    res.render(`index`);
  });

  

  // Load example page and pass in an example by id
  app.get("/recipes", function(req, res) {
    var apiKey = process.env.SPOONACULAR_API;
    var ingredients = "banana";
    var queryUrl =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=" +
      ingredients;

    unirest
      .get(queryUrl)
      .header("X-RapidAPI-Key", apiKey)
      .end(function(result) {
        if (result.status === 200) {
          console.log(result.body);
          res.render("recipes", { recipe: result.body });
        } else {
          console.log("this is the end");
        }
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
