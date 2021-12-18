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

    res.render("index", { title: "Resipe Blog", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /categories
 * Categories
 */
exports.categoryRecipes = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", { title: "Resipe Blog - Categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /categories/:id
 * Categories By Id
 */
exports.categoryRecipesById = async (req, res) => {
  try {
    let categoryId = req.params.id;

    const limitNumber = 10;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );

    res.render("categoryById", {
      title: "Resipe Blog - Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /recipe/:id
 * Detail Recipe
 */
exports.detailRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", { title: "Resipe Blog - Detail-Recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * POST /search
 * Search Recipe
 */

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "Resipe Blog - Search", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /explore-latest
 * Latest Recipe
 */
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 10;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render("explore-latest", {
      title: "Resipe Blog - Latest Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /explore-recipe
 * Explore Recipe
 */
exports.exploreRecipe = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render("recipe", {
      title: "Resipe Blog - Random Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /submit-recipe
 * Submit Recipe
 */
exports.submitRecipe = async (req, res) => {
  try {
    const infoErrorObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    res.render("submit-recipe", {
      title: "Resipe Blog - Submit Recipe",
      infoErrorObj,
      infoSubmitObj,
    });
  } catch (error) {}
};

/**
 * POST /submit-recipe
 * Submit Recipe
 */
exports.submitRecipePost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No file uploaded");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;
      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      img: newImageName,
    });
    await newRecipe.save();
    req.flash("infoSubmit", "Recipe submitted successfully");
    res.redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoErrors", error);
    res.redirect("/submit-recipe");
  }
};

// async function insertDummyCategory() {
//   try {
//     await Category.insertMany([
//       {
//         name: "Indonesian",
//         img: "indonesian-food.jpg",
//       },
//     ]);
//   } catch (err) {
//     console.log("err", +err);
//   }
// }

// insertDummyCategory();

// async function insertDummyRecipeData() {
//   try {
//     await Recipe.insertMany([
//       {
//         name: "Soto Ayam",
//         description:
//           "Cuci bersih ayam, rebus dan goreng sampai menguning. Kemduian ayam di suwir jadi kecil. Haluskan bumbu bawang merah,bawang putih, kunyit, ketumbar dan kemiri. Setelah itu tumis bumbu hingga harum bersama daun salam,sereh dan lengkuas. Didihkan air di panci setelah mendidih masukan bumbu halus tadi ke dalam air mendidih tambahkan lada, garam, gula, penyedap rasa. Saya masukkan juga tulang ayam ke dalam kuah soto. Test rasa, Rebus toge dan mie kuning. Setelah semua selesai siap di hidangkan.",
//         email: "adityatri@gmail.com",
//         ingredients: [
//           "1/2 Ekor ayam",
//           "Toge",
//           "Mie kuning",
//           "Daun bawang",
//           "Bawang goreng",
//           "2 lembar daun salam",
//           "2 batang sereh",
//           "1/4 lengkuas",
//           "1 sdt lada bubuk",
//           "Bumbu halus",
//           "4 siung bawang merah",
//           "4 siung bawang putih",
//           "1/2 sdt ketumbar bubuk",
//           "1 sdt kunyit bubuk",
//           "3 butir kemiri",
//         ],
//         category: "Indonesian",
//         img: "https://img-global.cpcdn.com/recipes/27c530d80f8a83c6/640x640sq70/photo.webp",
//       },
//     ]);
//   } catch (err) {
//     console.log("err", +err);
//   }
// }

// insertDummyRecipeData();
