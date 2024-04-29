import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { CiStopwatch,CiTrash } from "react-icons/ci";
import { toast } from 'react-toastify';


const DetailPage = () => {
  const [isLoding, setLoding] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  //url den parametre alma
  const { id } = useParams();
  //Apiden urun bilgilerini cek
  useEffect(() => {
    setLoding(true);
    axios
      .get(`http://127.0.0.1:4000/api/recipes/${id}`)
      .then((res) => setData(res.data.recipe))
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoding(false));
  }, []);
  //Silme fonksiyonu
  const handleDelete = ()=>{
   if(confirm('Silmek istediğinize emin misiniz?')){
    axios.delete(`http://127.0.0.1:4000/api/recipes/${id}`)
    .then(()=>{
    //Bildirim gönder
    toast.warn('Silme İşlemi Başarılı')
    //Anasayfaya yönlendir
    navigate('/')
    })
    .catch(()=>{
    //Hata bildirimi gönder
    toast.error('Silme İşlemi Başarısız')
    })
  }
  }


  return (
    <div className=" flex-1 bg-gray-200 p-5 h-screen overflow-auto">
      <div className=" flex justify-between">
        <Link
          to={-1}
          className=" flex items-center gap-4 text-xl hover:bg-gray-300 p-1 rounded-md"
        >
          <IoMdArrowBack />
          Geri
        </Link>
        <button onClick={handleDelete} className=" bg-red-500 flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-red-600 transition">

        <CiTrash />
        Sil
        </button>
      </div>
      {isLoding ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="my-10 flex flex-col gap-5 max-w-5xl m-auto">
          <h1 className=" text-3xl font-bold">{data.recipeName}</h1>
          <div className=" flex gap-4">
            <span className=" bg-green-500 py-2 px-4 rounded-lg text-white font-semibold">{data.category}</span>
            <span className=" bg-green-500 py-2 px-4 rounded-lg text-white font-semibold flex items-center gap-2"> <CiStopwatch /> {data.recipeTime}</span>
          </div>
          <img className=" rounded-lg max-h-[400px]" src={data.image} alt='' />
          <div>
            <h1 className=" text-red-500 text-2xl font-bold mb-3"> Malzemeler</h1>
            {
              data.ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4 text-red-500 ">Tarif</h1>

              {data.instructions.map((item)=>(
                <li>{item}</li>
                ))}

          </div>
          <div>
            <h1 className=" text-2xl  mb-4 text-red-500">Sunum Önerisi</h1>
            <p className="  ">{data.servingSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
