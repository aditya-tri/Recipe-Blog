const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: "This field is required",
  },
  description: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
    required: "This field is required.",
  },
  ingredients: {
    type: Array,
    required: "This field is required.",
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Mexican", "Indian", "Indonesian"],
    required: "This field is required.",
  },
  img: {
    type: String,
    required: "This field is required.",
  },
});

recipeSchema.index({ name: "text", description: "text" });
// WildCard indexing
// recipeSchema.index({ "$**": "text" });

module.exports = mongoose.model("recipe", recipeSchema);
