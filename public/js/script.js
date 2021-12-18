let addIngredientBtn = document.getElementById("addIngredientBtn");
let ingredientList = document.querySelector(".ingredient-list");
let ingredients = document.querySelectorAll(".ingredients")[0];

addIngredientBtn.addEventListener("click", function () {
  let newIngredients = ingredients.cloneNode(true);
  let input = newIngredients.getElementsByTagName("input")[0];
  input.value = "";
  ingredientList.appendChild(newIngredients);
});
