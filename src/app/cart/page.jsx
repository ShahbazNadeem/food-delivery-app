'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import CommenLayout from '../_components/layout/CommenLayout';
import { Icons } from '../data/Imports';
import OrderPage from '../_components/OrderPage';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const CartPage = () => {
  const [user, setUser] = useState(null)
  const router = useRouter();
  const pathname = usePathname();
  const callbackUrl = encodeURIComponent(pathname || '/');
  const [lock, setLock] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('User')
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const checkoutRef = useRef(null);
  const scrollToCheckout = () => {
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setTimeout(() => {
      setLock(false)
    }, 700);
  };

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
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
  const dilevery_boy_id = '123456789'

  const orderNow = async () => {
    if (user) {
      const subtotal = calculateTotal();
      const tax = calculateTax();
      const totalAmount = subtotal + tax;

      const collection = {
        user_Id: user._id || user.id,
        order: groupedCart,
        // deliveryBoy_Id: dilevery_boy_id,
        deliveryStatus: 'ok',
        amount: totalAmount,
      };

      console.log('Order Collection:', collection);
      let res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        body: JSON.stringify(collection)
      })
      res = await res.json()
      if (res.success) {
        clearCart();
        alert('ok')
      } else {
        alert('not ok')
      }
    } else {
      console.log('order cancelled');
    }
  };

  if (groupedCart.length === 0) {
    return (
      <CommenLayout>
        <div className="h-screen bg-gray-100">
          <div className="container">
            <div className="pt-30">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Your Cart</h2>
              <div className="flex justify-center items-center flex-col gap-1">
                <h3>Currently your cart is empty</h3>
                <span>Go to home page and <Link href='/' className='text-blue-700 underline'>shop first</Link></span>
              </div>
            </div>
          </div>
        </div>
      </CommenLayout>
    )
  }

  return (
    <CommenLayout>
      <section>
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
                          className='bg-[#1a2b48]  text-white border border-white rounded-full px-5 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-[#1a2b48] hover:border-[#1a2b48] cursor-pointer'
                          onClick={() => decreaseQuantity(item._id)}
                        >
                          <Icons.minus size={13} />
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          className='bg-[#1a2b48]  text-white border border-white rounded-full px-5 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-[#1a2b48] hover:border-[#1a2b48] cursor-pointer'
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
                        className='bg-red-500 text-white border border-white rounded-full px-5 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-red-500 hover:border-red-500 cursor-pointer'
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
                {user ? (
                  <button onClick={scrollToCheckout} className="w-full mt-6 font-medium rounded-lg hover:bg-gray-900 transition">
                    Proceed to Checkout
                  </button>
                ) : (

                  <Link href={`/user-auth?callbackUrl=${callbackUrl}`}>
                    <button className="w-full mt-6 font-medium rounded-lg hover:bg-gray-900 transition">
                      Login to Proceed
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <OrderPage />

          {user &&
            <div className="max-w-6xl mx-auto mt-6 bg-white rounded-xl shadow-lg p-4 flex justify-between items-center flex-wrap" ref={checkoutRef}>
              <div className="">
                <h2 className='mb-2'>Checkout Method</h2>
                <p>Currently we only deal in COD</p>
                <p>your order will be delivered at your footstep soon!</p>
              </div>
              <div className="lg:min-w-44 flex justify-center items-center mt-2 sm:mt-0">
                {!lock && <button onClick={orderNow}>Order now</button>}
              </div>
            </div>
          }

        </div>
      </section>
    </CommenLayout >
  );
};

export default CartPage;
