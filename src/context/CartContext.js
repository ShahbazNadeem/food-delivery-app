'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('addToCart(FDA)');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('addToCart(FDA)');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('addToCart(FDA)', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.find((i) => i._id === item._id);
    if (exists) {
      setCart((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
