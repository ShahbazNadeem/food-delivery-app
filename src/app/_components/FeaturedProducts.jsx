import React from 'react';

// Root Component
const FeaturedProducts = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-8">
      {children}
    </div>
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

// Image
FeaturedProducts.Image = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-60 object-cover"
    />
  );
};

// Details Wrapper
FeaturedProducts.Details = ({ children }) => {
  return (
    <div className="p-4 w-full flex justify-between items-center">
      {children}
    </div>
  );
};

// Title
FeaturedProducts.Title = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold">{children}</h3>
  );
};

// Price
FeaturedProducts.Price = ({ children }) => {
  return (
    <p className="text-md font-medium mt-2">{children}</p>
  );
};

export default FeaturedProducts;
