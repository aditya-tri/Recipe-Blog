const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayout);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./routes/recipeRoutes.js");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
});
