'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import CommenLayout from '../_components/layout/CommenLayout';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price || item.itemPrice || 0), 0);
  };

  return (
    <CommenLayout>
      <section>
        <div className="container">
          <div className="my-20">
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>

            {/* If cart is empty */}
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-6"
                    >
                      {/* Image + Info */}
                      <div className="flex items-center gap-5 w-full md:w-1/2">
                        <img
                          src={item.itemImg || item.img}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg shadow-sm"
                        />
                        <div>
                          <h2 className="text-lg font-medium text-gray-800">{item.name || item.itemName}</h2>
                          {(item.description || item.itemDecription) && (
                            <p className="text-sm text-gray-500">{item.description || item.itemDecription}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 w-full md:w-auto">
                        <p className="text-base font-semibold text-gray-800">
                          Rs {item.price || item.itemPrice || 0}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Section */}
                <div className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <p className="text-sm text-gray-500">* Shipping & taxes calculated at checkout.</p>

                  <div className="w-full md:w-1/3 space-y-3">
                    <div className="flex justify-between text-lg font-medium text-gray-800">
                      <span>Total</span>
                      <span>Rs {calculateTotal()}</span>
                    </div>
                    <button className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </CommenLayout>
  );
};

export default CartPage;
