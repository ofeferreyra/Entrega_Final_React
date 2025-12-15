
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
// Pages
// ----------------------------------------------
import Login from './pages/login.jsx';
import RandomCart from './pages/products.jsx';
import NotFound from './pages/notFound.jsx';
import Products from './pages/products.jsx';
// Context
// ----------------------------------------------
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

import Home from './components/home.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Footer from './components/footer';
import CrudProducts from './components/crudProducts.jsx';
import Carrito from './components/cart.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>

          <Header/>
          
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<>
                <Home />
                <RandomCart />
              </>} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products /> } />
              <Route path="/cart" element={<Carrito />} />
              <Route path="/crud" element={
                <ProtectedRoute><CrudProducts /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer/>

        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
