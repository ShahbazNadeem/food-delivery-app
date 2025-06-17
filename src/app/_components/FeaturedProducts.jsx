import React from 'react';
import { IoCart } from "react-icons/io5";


// Root Component
const FeaturedProducts = ({ children }) => {
  return (
    <>
      <h2 className='text-center'>Featured Products</h2>
      <div className="flex flex-wrap justify-center gap-6 px-4 py-8">
        {children}
      </div>
    </>
  );
};

// Card
FeaturedProducts.Card = ({ children }) => {
  return (
    <div className="w-full sm:w-[45%] md:w-[30%] flex flex-col items-center rounded-xl shadow-md overflow-hidden bg-white">
      {children}
    </div>
  );
};

// Image (with addToCart functionality)
import { useCart } from '@/context/CartContext';

FeaturedProducts.Image = ({ src, alt, item }) => {
  const { addToCart } = useCart();

  return (
    <div className="relative w-full h-60">
      <IoCart
        size={30}
        onClick={() => addToCart(item)}
        className="cursor-pointer hover:scale-110 transition-transform absolute top-2 right-2 text-white backdrop-blur-2xl bg-amber-700 rounded-2xl p-1"
      />
      <img src={src} alt={alt} className="w-full h-full object-cover rounded-2xl" />
    </div>
  )
};

// Details Wrapper
FeaturedProducts.Details = ({ children }) => {
  return (
    <div className="p-4 w-full flex justify-between items-center">
      {children}
    </div>
  )
};

// Title
FeaturedProducts.Title = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold">{children}</h3>
  )
};

// Price
FeaturedProducts.Price = ({ children }) => {
  return (
    <p className="text-md font-medium mt-2">{children}</p>
  )
};

export default FeaturedProducts;
