const express = require("express");
const router = express.Router();
const recipeController = require("../server/controllers/recipeController");

// App Routes
router.get("/", recipeController.homepage);

module.exports = router;
