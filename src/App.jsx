import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/login/login';
import Register from './page/register/register';
import Principal from './page/Principal/principal';
import MainLayout from './Layout/MainLayout';
import Tienda from './page/Tienda/tienda';
import MisionYVision from './page/misionYvision/misioYvision';
import Reservación from './page/reservacion/reservacion';
import Nosotros from './page/nosotros/nosotros';
import Service from './page/servicios/service';
import ListProducto from './prueba/ListProducto';
import CartPage from './component/cart/CartPage';
import { CartProvider } from './component/cart/CartProviderContext';
import { AuthProvider } from './component/context/AuthContext';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay un usuario logueado en el localStorage
    const clienteId = localStorage.getItem('clienteId');
    const clienteEmail = localStorage.getItem('clienteEmail');
    if (clienteId && clienteEmail) {
      setUser({ id: clienteId, email: clienteEmail });
    }
  }, []);

  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/admin' element={<ListProducto/>}/>

          <Route path="/" element={<MainLayout />}>
            
            <Route index element={<Principal />} /> 
            <Route path="/principal" element={<Principal />} /> 
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/misionyvision" element={<MisionYVision />} />
            <Route path="/reservacion" element={<Reservación />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Service />} />
            <Route path="/compra" element={<CartPage />} />
          </Route>
        </Routes>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
