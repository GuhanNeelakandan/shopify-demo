
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Component/Pages/Navbar/Navbar'
import Products from './Component/Pages/Products/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from './Component/Pages/Cart/Cart'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
