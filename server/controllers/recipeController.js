require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );

    const food = { latest, thai, american, chinese };

    res.render("index", { title: "Homepage", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /
 * Categories
 */
exports.categoryRecipes = async (req, res) => {
  try {
    const limitNumber = 10;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", { title: "Resipes - Categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

// async function insertDummyCategory() {
//   try {
//     await Category.insertMany([
//       {
//         name: "Thai",
//         img: "thai-food.jpg",
//       },
//       {
//         name: "American",
//         img: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         img: "chinese-food.jpg",
//       },
//       {
//         name: "Mexican",
//         img: "mexican-food.jpg",
//       },
//       {
//         name: "Indian",
//         img: "indian-food.jpg",
//       },
//       {
//         name: "Spanish",
//         img: "spanish-food.jpg",
//       },
//     ]);
//   } catch (err) {
//     console.log("err", +err);
//   }
// }

// insertDummyCategory();
