import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/header'
import News from './components/news'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
function App() {
  return (
<>
<BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/About" element={<About/>}></Route>
  </Routes>
</BrowserRouter>
<Header />
<News />
<Footer />

</>
  )
}
export default App;