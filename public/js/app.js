$(document).ready(function() {
  var userData = {
    email: $("#email")
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
$("#loginButton").on("click", function() {
  var userData = {
    email: $("#email")
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
$(document).on("click", "#submit-ingredient", function() {
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
