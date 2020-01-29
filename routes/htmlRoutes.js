var db = require("../models");
var unirest = require("unirest");
var apiKey = process.env.SPOONACULAR_API;

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/recipes", function(req, res) {
    var ingredients = "banana";
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

  app.get("/view-recipe", function(req, res) {
    id = "479101";
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
