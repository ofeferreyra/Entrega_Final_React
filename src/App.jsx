
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
// Pages
// ----------------------------------------------
import Login from './pages/login.jsx';
import RandomCart from './pages/products.jsx';
import Perfil from './pages/perfil.jsx';
import Administration from './pages/administration.jsx';
import NotFound from './pages/notFound.jsx';
import Products from './pages/products.jsx';
// Context
// ----------------------------------------------
import { CartProvider } from './context/CartContext.jsx';

import Home from './components/home.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Footer from './components/footer';

import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<>
            <Home />
            <RandomCart />
          </>} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products /> } />
          <Route path="/perfil/:id" element={
            <ProtectedRoute><Perfil /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute><Administration /></ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
