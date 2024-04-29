import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoIosHome } from "react-icons/io";
import { IoCompass } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { LuHelpCircle } from "react-icons/lu";
import { IoIosCreate } from "react-icons/io";

const SideBar = () => {
  return (
    <div className=' flex flex-col h-screen justify-between items-center p-3 max-md:p-2 max-md:justify-normal max-md:gap-20 lg:p-10'>
        <Link to={'/'}>
        <img className=' w-[150px] max-md:w-[90px]' src="/Logo2.jpeg" width={140} alt="" />
        </Link>
        <div className=' flex flex-col gap-20'>
            <NavLink to={'/'} className='flex gap-4 items-center text-lg text-gray-500 active'>
                <IoIosHome className=' max-md:text-2xl'/>
                <span className=' max-md:hidden'>Anasayfa</span>
            </NavLink>
            <NavLink to={'/ekle'} className='flex gap-4 items-center text-lg text-gray-500'>
                <IoIosCreate className=' max-md:text-2xl'/>
                <span className=' max-md:hidden'>Tarif Ekle</span>
            </NavLink>
            <NavLink to={'/discover'} className='flex gap-4 items-center text-lg text-gray-500'>
                <IoCompass className=' max-md:text-2xl'/>
                <span className=' max-md:hidden'>Kesfet</span>
            </NavLink>
            <NavLink to={'/likes'} className='flex gap-4 items-center text-lg text-gray-500'>
                <FaHeart className=' max-md:text-2xl'/>
                <span className=' max-md:hidden'>Favoriler</span>
            </NavLink>
            <NavLink to={'/settings'} className='flex gap-4 items-center text-lg text-gray-500'>
                <LuHelpCircle className=' max-md:text-2xl'/>
                <span className=' max-md:hidden'>Yardim</span>
            </NavLink>
        </div>
        <div className=' flex flex-col gap-2 max-md:hidden'>
<p className=' font-semibold'>Gunluk haberleri al</p>
        <button className=' bg-red-500 p-2 rounded-lg text-white hover:bg-red-400 '>Abone ol</button>
        </div>
    </div>
  )
}

export default SideBar