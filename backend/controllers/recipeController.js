const { getData } = require("../utils/getData");
const crypto = require("crypto");
const { setData } = require("../utils/setData");
let data = getData();

exports.getAllRecipes = (req, res) => {
  let recipes = [...data];
  //Aratilan terime eris
  const searchTerm = req.query?.title?.trim()?.toLowerCase();
  //Siralama parametresine eris
  const order = req.query?.order?.toLowerCase();
  // Aratilan terim  varsa filtrele sonuc gönder
  if (searchTerm) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchTerm)
    );
  }
  // Eger order varsa sirayi gönder

  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }
  //Aratilan terim yoksa tum datayi gönder
  res.status(200).json({
    message: "Tarifler basarili bir sekilde alindi",
    results: data.length,
    recipes: recipes,
  });
};
exports.getRecipe = (req, res) => {

  // Aratilan terim varsa bu sonucu gönder

  res.status(200).json({
    message: "Aradiginiz tarif bulundu",
    recipe: req.recipe,
  });
};
exports.createRecipe = (req, res) => {
  // Istegin body'si ile gelen veriye eris
  const newRecipe = req.body;

  //girilen tum degerler var mi kontrol et
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.ingredients ||
    !newRecipe.category ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({
      message: "Tum alanlari doldurunuz",
    });
  }
  //Yeni tarifin id'sini al
  newRecipe.id= crypto.randomUUID()
  //Yeni tarifi diziye ekle
  data.push(newRecipe);
  //yeni diziyi json dosyasina kaydet
  setData(data)

  //Cevap gönder
  res.status(200).json({
    message: "Tarif basarili bir sekilde olusturuldu",
    recipe:req.recipe,
  });
};
exports.deleteRecipe = (req, res) => {
//Silinecek elemanin index'ini bul
const index = data.findIndex((i)=> i.id == req.params.id)
//sirasi bilinen tarifi sil
data.splice( index, 1)
// json dosyasini guncelle
setData(data)

//cevap gönder
res.status(204).json({
  message: "Tarif basarili bir sekilde silindi",
})
}
