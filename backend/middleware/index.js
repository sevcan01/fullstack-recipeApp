const { getData } = require("../utils/getData");

const data = getData()

exports.controlId = (req, res, next) => {
    const recipe = data.find((i) => i.id == req.params.id);
  
    //Aratilan terim  yoksa bu sonuc gönder
    if (!recipe) {
    
      return next(res.status(404).json({
        message: "Aradiginiz tarif bulunamadi"}))
    }

    req.recipe = recipe;
// Bulunursa bir sonraki adima gec
    next()
}