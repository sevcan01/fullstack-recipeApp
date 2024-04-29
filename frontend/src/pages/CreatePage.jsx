import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";
const CreatePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Butun inputlardaki verileri alip bir obje haline getir
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());
    //Selected alanindaki verileri dataya ekle
    newRecipe = {
      ...newRecipe,
      ingredients,
      instructions,

      image: `https://picsum.photos/5${Math.floor(Math.random() * 89) + 10}`,
    };
    //Api istegi at veriyi kaydet
    axios
      .post("http://127.0.0.1:4000/api/recipes", newRecipe)
      //Veri basariyla eklenirse
      .then(() => {
        //Bildirim gönder
        toast.success("Tarif Başarıyla Oluşturuldu");
        //Anasayfaya yönlendir
        navigate("/");
      })
      .catch(() => toast.error("Tarif Oluşturulamadı"))
  };
  return (
    <div className=" flex-1 bg-gray-200 p-4 h-screen overflow-auto">
      <form
        onSubmit={handleSubmit}
        className=" max-w-2xl m-auto my-20 flex flex-col gap-10"
      >
        <h1 className=" text-3xl font-bold text-red-500">Yeni Tarif Olustur</h1>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Tarif Kategorisi</label>
          <input
            required
            className=" rounded-md p-2 "
            type="text"
            name="category"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Tarif Basligi</label>
          <input
            required
            className=" rounded-md p-2"
            type="text"
            name="recipeName"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Tarif Süresi</label>
          <input
            required
            className=" rounded-md p-2"
            type="number"
            min={3}
            max={500}
            name="recipeTime"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Malzemeler</label>
          <Creatable
            onChange={(options) => {
              const refined = options.map((opt) => opt.label);
              setIngredients(refined);
            }}
            required
            isMulti
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">
            Tarif Adimlari (Sirlamaya göre ekleyin)
          </label>
          <Creatable
            required
            onChange={(options) => {
              const refined = options.map((opt) => opt.label);
              setInstructions(refined);
            }}
            isMulti
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Sunum Önerisi</label>
          <textarea
            name="servingSuggestion"
            className=" p-2 rounded-md min-h-[150px] max-h-[300px]"
          ></textarea>
        </div>
        <div className=" flex justify-end gap-6">
          <Link
            to={"/"}
            className=" bg-gray-500 p-3 rounded-lg text-white font-semibold hover:bg-gray-600"
          >
            Iptal
          </Link>
          <button className=" bg-red-500 p-3 rounded-lg text-white font-semibold hover:bg-red-600">
            Olustur
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
