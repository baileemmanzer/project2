$(document).ready(function() {
  // Sends registration info from the login page
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
    $.post("/api/signup", userData)
      .then(function(res) {
        window.location.replace(res);
      })
      .catch(function(err) {
        console.log(err.responseJSON);
      });
  });

  // Sends login info from the login page
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

  // Sends a newly added ingredient from the fridge page
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
    $.ajax("/api/shoppinglist", {
      type: "POST",
      data: sLIngredientData
    }).then(function() {
      console.log("Added new ingredient to your shopping list");
      location.reload();
    });
  });

  // Takes checked ingredients and sends it to the recipes api to find recipes based on those ingredients
  $(".submit-ingr").on("click", function(event) {
    event.preventDefault();
    var ingrArray = [];
    $.each($("input[name='ingredient']:checked"), function() {
      ingrArray.push($(this).val());
    });
    ingrArray = ingrArray.join(",+");
    window.location.replace("/recipes/" + ingrArray);
  });

  // Sends id of a recipe when a recipe is clicked
  $(".view-recipe").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    $.ajax("/view-recipe/:" + id, {
      type: "GET"
    }).then(function() {
      window.location.replace("/view-recipe/" + id);
    });
  });

  // Deletes kitchen inventory items if delete button is clicked
  $(document.body).on("click", ".fridge-delete", function(event) {
    event.preventDefault();
    var ingredientId = $(this).data("id");
    $.ajax("/api/kitcheninventory/" + ingredientId, {
      type: "DELETE"
    }).then(function() {
      console.log("Removed ingredient from kitchen");
      location.reload();
    });
  });

  // Goes back to the find recipes page if the back button is clicked
  $(document).on("click", "#recipes-back-button", function(event) {
    event.preventDefault();
    $.ajax("/find-recipes", {
      type: "GET"
    }).then(function() {
      window.location.replace("/find-recipes");
    });
  });

  // Route to move expired ingredient from kitchen inventory to shopping list
  $(document).on("click", ".exp-shop", function(event) {
    event.preventDefault();
    var ingredientId = $(this).data("id");
    var ingredientData = {
      ingredient: $(this).data("ingredient"),
      quantity: $(this).data("quantity")
    };
    $.ajax("/api/move-expired-to-shopping/" + ingredientId, {
      type: "POST",
      data: ingredientData
    }).then(function() {
      window.location.replace("/expired-items");
    });
  });

  // Route to move ingredient from shopping list to kitchen inventory
  $(document).on("click", "#shop-fridge", function() {
    event.preventDefault();
    var ingredientId = $(this).data("id");
    var ingredient = $(this).data("ingredient")
    $("#myModal").on("shown.bs.modal", function() {
      $("#myInput").trigger("focus");
    });
    $(document).on("click", "#shop-submit-final", function() {
      var ingredientData = {
        ingredient: ingredient,
        quantity: $("#shop-quantity")
          .val()
          .trim(),
        expirationDate: $("#shop-expiration-date")
          .val()
          .trim(),
        frequency: $("#shop-frequency")
          .val()
          .trim()
      };
      console.log(ingredientData);
      $.ajax("/api/move-shopping-to-fridge/" + ingredientId, {
        type: "Post",
        data: ingredientData
      }).then(function() {
        window.location.replace("/shopping-list");
      });
    });
  });
});
