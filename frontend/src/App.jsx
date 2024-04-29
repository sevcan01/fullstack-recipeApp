import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'
import Header from './components/Header'
import SideBar from './components/SideBar'
import CreatePage from './pages/CreatePage'

const App = () => {
  return (
<BrowserRouter>
<div className="flex">
<SideBar/>
 <Routes>
  <Route path='/' element={<MainPage/>}/>
  <Route path='/tarif/:id' element={<DetailPage/>}/>
  <Route path='/ara' element={<SearchPage/>}/>
  <Route path='/ekle' element={<CreatePage/>}/>
 </Routes>
</div>
</BrowserRouter>
  )
}

export default App