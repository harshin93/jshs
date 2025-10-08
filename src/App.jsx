import { useState } from 'react'
import '../src/App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/Signup'
import SearchPage from './Pages/SearchPage'
import ContactUs from './Pages/ContactUs'
import { initializeApp } from "firebase/app";

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Search" element={<SearchPage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<SignUp/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
        </Routes>
    </div>
  )
}

export default App
