$(document).ready(function() {
  $("#registerButton").on("click", function(event) {
    event.preventDefault();
    var userData = {
      phone: $("#phone")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };
    console.log(userData);
    $.post("/api/signup", userData)
      .then(function(res) {
        window.location.replace(res);
      })
      .catch(function(err) {
        console.log(err.responseJSON);
      });
  });

  $("#loginButton").on("click", function(event) {
    event.preventDefault();
    var userData = {
      phone: $("#phone")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };
    $.post("/api/login", userData)
      .then(function(res) {
        window.location.replace(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  $(document).on("click", "#submit-ingredient", function(event) {
    event.preventDefault();
    var ingredientData = {
      ingredient: $("#ingredient")
        .val()
        .trim(),
      quantity: $("#quantity")
        .val()
        .trim(),
      expirationDate: $("#expiration-date")
        .val()
        .trim(),
      frequency: $("#frequency")
        .val()
        .trim()
    };
    console.log(ingredientData);
    $.ajax("/api/kitcheninventory", {
      type: "POST",
      data: ingredientData
    }).then(function() {
      console.log("Added new ingredient to kitchen");
      location.reload();
    });
  });

  //Button functionality for shopping list
  $(document).on("click", "#addToShoppingList", function(event) {
    event.preventDefault();
    var sLIngredientData = {
      ingredient: $("#ingredient")
        .val()
        .trim(),
      quantity: $("#quantity")
        .val()
        .trim()
    };
    console.log(sLIngredientData);
    $.ajax("/api/shoppinglist", {
      type: "POST",
      data: sLIngredientData
    }).then(function() {
      console.log("Added new ingredient to your shopping list");
      location.reload();
    });
  });

  $(".submit-ingr").on("click", function(event) {
    event.preventDefault();
    var ingrArray = [];
    $.each($("input[name='ingredient']:checked"), function() {
      ingrArray.push($(this).val());
    });
    ingrArray = ingrArray.join(",+");
    console.log(ingrArray);
    window.location.replace("/recipes/:" + ingrArray);
  });

  $(".view-recipe").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    $.ajax("/view-recipe/:" + id, {
      type: "GET"
    }).then(function() {
      window.location.replace("/view-recipe/" + id);
    });
  });
});
