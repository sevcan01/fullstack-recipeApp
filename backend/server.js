const express = require("express");
const cors = require("cors");
const { getRecipe, getAllRecipes } = require("./controllers/recipeController");
const recipeRoute = require('./routes/recipeRoute')
const app = express();
// istekteki json verisini isler
app.use(express.json());
//Cors hatalarini önleyen middleware
app.use(cors());

//route tanimi yap
app.use(recipeRoute)

//dinlenecek portu belirle
app.listen(4000, () => {
  console.log("Server 4000 portunu dinlemeye basladi");
});
