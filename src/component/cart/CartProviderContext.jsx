// CartProviderContext.jsx

import React, { createContext, useContext, useState } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor de carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, cantidad) => {
    const existingProduct = cart.find(item => item.idProducto === producto.idProducto);
    if (existingProduct) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { ...producto, cantidad }]);
    }
  };

  const removeFromCart = (productoId) => {
    setCart(cart.filter(producto => producto.idProducto !== productoId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al carrito
export const useCart = () => {
  return useContext(CartContext);
};
