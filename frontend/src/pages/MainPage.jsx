import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import { useDebounce } from "@uidotdev/usehooks";


const MainPage = () => {
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [order , setOrder] = useState(null)
  useEffect(() => {
    setLoading(true);
    const params ={
      title:debouncedSearchTerm,
      order:order,
    }

    axios
      .get(`http://127.0.0.1:4000/api/recipes`,{params})
      .then((res) => {
        setData(res.data);
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, [debouncedSearchTerm,order]);


  return (


      <main className=" flex-1 bg-gray-200 p-4 h-screen overflow-auto">
        <section className=" ">
          <div className=" bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center">
            <FaSearch className=" text-xl shadow-lg" />
            <input onChange={(e)=>setSearchTerm(e.target.value)} className=" w-full outline-none" type="text" />
          </div>
        </section>
        <section className=" mt-5">
          {loading ? (
            <Loader />
          ) : errorMsg ? (
            <Error message={errorMsg}/>
          ) : (
            <>
            <div className="flex justify-between items-center">
              <h1 className=" text-3xl my-5">{data.results} Tarif Bulundu</h1>
              
              <select value={order} onChange={(e)=>{setOrder(e.target.value)}} className=" rounded-md p-2">
                <option selected disabled>Sureye Göre</option>
                <option value={'asc'}>Artan</option>
                <option value={'desc'}>Azalan</option>
              </select>
            </div>
              <div className=" grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {data.recipes.map((recipe)=>(
                  <Card key={recipe.id} recipe={recipe}/>
                  ))}
              </div>
            </>
          )}
        </section>
      </main>

  );
};

export default MainPage;
