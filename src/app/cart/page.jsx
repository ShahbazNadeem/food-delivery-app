import React from 'react';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>

        {/* CART ITEMS */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-6">
            {/* Image + Title */}
            <div className="flex items-center gap-5 w-full md:w-1/2">
              <img
                src="https://via.placeholder.com/120"
                alt="product"
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-800">Premium Hoodie</h2>
                <p className="text-sm text-gray-500">Color: Black · Size: M</p>
              </div>
            </div>

            {/* Quantity + Price */}
            <div className="flex items-center justify-between gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 overflow-hidden">
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">−</button>
                <span className="w-10 text-center text-sm border-x">1</span>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
              </div>
              <p className="text-base font-semibold text-gray-800">Rs 2,500</p>
              <button className="text-red-500 hover:underline text-sm">Remove</button>
            </div>
          </div>

        </div>

        {/* SUMMARY SECTION */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-sm text-gray-500">* Shipping & taxes calculated at checkout.</p>
          </div>

          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex justify-between text-lg font-medium text-gray-800">
              <span>Total</span>
              <span>Rs 2,500</span>
            </div>
            <button className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
