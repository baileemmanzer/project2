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
