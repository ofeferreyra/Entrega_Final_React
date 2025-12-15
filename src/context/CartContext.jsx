import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const itemEncontrado = prevCarrito.find(item => item.id === producto.id);

      if (itemEncontrado) {
        if (itemEncontrado.cantidad >= producto.stock) {
            return prevCarrito; 
        }
        
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      if (producto.stock > 0) {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
      
      return prevCarrito;
    });
  };

  const disminuirCantidad = (id) => {
    setCarrito((prevCarrito) => 
      prevCarrito.map(item => {
        if (item.id === id) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      }).filter(item => item.cantidad > 0)
    );
  };
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };
  const vaciarCarrito = () => setCarrito([]);
  const totalGeneral = carrito.reduce((acc, item) => acc + (Number(item.precio) * item.cantidad), 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalGeneral,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};