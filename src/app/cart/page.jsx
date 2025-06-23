'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CommenLayout from '../_components/layout/CommenLayout';
import { async } from './../api/restaurant/foods/route';
import { Icons } from '../data/Imports';

const CartPage = () => {
  const [lock, setLock] = useState(false)
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find((i) => i._id === item._id);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      acc.push({ ...item, quantity: item.quantity || 1 });
    }
    return acc;
  }, []);

  const calculateTotal = () => {
    return groupedCart.reduce(
      (total, item) =>
        total + (item.price || item.itemPrice || 0) * item.quantity,
      0
    );
  };

  const calculateTax = () => Math.round(calculateTotal() * 0.05);

  return (
    <CommenLayout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-20">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🛒 Your Cart
            </h2>

            {groupedCart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              groupedCart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-white shadow-md rounded-xl p-4 gap-4 hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={item.itemImg || item.img}
                    alt={item.name || item.itemName}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {item.name || item.itemName}
                    </h3>
                    <p className="text-gray-600">
                      Rs {(item.price || item.itemPrice || 0).toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2 space-x-3">
                      <span
                        className={`${lock ? 'pointer-events-none bg-[#8b9ab8]' : 'bg-[#1a2b48]'}  text-white border border-white rounded-full px-5 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-[#1a2b48] hover:border-[#1a2b48] cursor-pointer`}
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        <Icons.minus size={13} />
                      </span>
                      <span>{item.quantity}</span>
                      <span
                        className={`${lock ? 'pointer-events-none bg-[#8b9ab8]' : 'bg-[#1a2b48]'}  text-white border border-white rounded-full px-5 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-[#1a2b48] hover:border-[#1a2b48] cursor-pointer`}
                        onClick={() => increaseQuantity(item._id)}
                      >
                        <Icons.plus size={13} />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-gray-800">
                      Rs {((item.price || item.itemPrice || 0) * item.quantity).toLocaleString()}
                    </span>
                    <span
                      className={`${lock ? 'pointer-events-none bg-red-300' : 'bg-red-500'}  text-white border border-white rounded-full px-5 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-red-500 hover:border-red-500 cursor-pointer`}
                      onClick={() => removeFromCart(item._id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20 h-fit">
            {lock &&
              <span className='flex gap-2 items-center mb-2 cursor-pointer'><Icons.leftArrow onClick={() => setLock(false)} size={15} /> Edit your order</span>}
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h3>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal</span>
              <span>Rs {calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Tax (5%)</span>
              <span>Rs {calculateTax().toLocaleString()}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>
                Rs {(calculateTotal() + calculateTax()).toLocaleString()}
              </span>
            </div>
            <div className="">

              {!lock &&
                <span onClick={() => setLock(true)} className="relative cursor-pointer flex justify-center items-center gap-1 px-3 py-2 mt-6 rounded-full border border-[#1a2b48] transition-all duration-300 hover:bg-[#1a2b48] hover:text-white group">Lock my order</span>}

              {lock &&

                <button className="w-full mt-6 font-medium rounded-lg hover:bg-gray-900 transition">
                  Proceed to Checkout
                </button>
              }

            </div>
          </div>
        </div>
      </div>
    </CommenLayout>
  );
};

export default CartPage;
