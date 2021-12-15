const express = require("express");
const router = express.Router();
const recipeController = require("../server/controllers/recipeController");

// App Routes
router.get("/", recipeController.homepage);
router.get("/categories", recipeController.categoryRecipes);
router.get("/recipe/:id", recipeController.detailRecipe);

module.exports = router;
