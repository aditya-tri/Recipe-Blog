const express = require("express");
const router = express.Router();
const recipeController = require("../server/controllers/recipeController");

// App Routes
router.get("/", recipeController.homepage);
router.get("/recipe/:id", recipeController.detailRecipe);
router.get("/categories", recipeController.categoryRecipes);
router.get("/categories/:id", recipeController.categoryRecipesById);
router.post("/search", recipeController.searchRecipe);
router.get("/latest-recipes", recipeController.exploreLatest);
router.get("/explore-recipes", recipeController.exploreRecipe);
router.get("/submit-recipe", recipeController.submitRecipe);
router.post("/submit-recipe", recipeController.submitRecipePost);

module.exports = router;
