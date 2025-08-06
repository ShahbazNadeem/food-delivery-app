'use client'
import React, { useEffect } from 'react'
import CommenLayout from '@components/layout/CommenLayout'
import DeliveryPartnerSwitcher from '@components/deliveryPartner/DeliveryPartnerSwitcher'
import { useDeliveryPartner } from '@/context/DeliveryPartnerContext';

const page = () => {
    const { deliveryUser, logout } = useDeliveryPartner();

    useEffect(() => {
        fetchOrders()
    }, [])
    

    const fetchOrders = async () => {
        // const res = await fetch('http://localhost:3000/api/orders');
        // res = await res.json();
        // console.log(res)
    }

    if (deliveryUser) {
        return (
            <CommenLayout>
                <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
                    <div className="max-w-4xl mx-auto pt-20">
                        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Incoming Orders</h1>
                        <div className="flex justify-between py-2">
                            <button>Dashboard</button>
                            <span>Refresh</span>
                        </div>
                        {/* Order Card */}
                        <div className="space-y-6">
                            {/* Single Order Loop Starts Here */}
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center p-4 md:items-start gap-4">
                                {/* Image */}
                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwg…" alt="item image" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                                {/* Order Details */}
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-800">Desi Murg Chany</h2>
                                    <p className="text-sm text-gray-600 mt-1">"khao gay to pata chaly ga na"</p>
                                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
                                        <p><strong>Qty:</strong> 1</p>
                                        <p><strong>Price:</strong> Rs. 250</p>
                                        <p><strong>Amount:</strong> Rs. 263</p>
                                        <p><strong>Status:</strong> <span className="text-green-600 font-medium">OK</span></p>
                                        <p><strong>Date:</strong> 2025-08-01</p>
                                    </div>
                                </div>
                                {/* Accept Button */}
                                <div className="mt-4 md:mt-0">
                                    <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transform transition">
                                        Accept
                                    </button>
                                </div>
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
                <div className="wrapper bg-[url('/images/login/userLogin.jpg')] bg-cover bg-center min-h-screen">
                    <div className="container">
                        <div className="flex items-center justify-center h-screen">
                            <div className="pt-10 xl:pt-10 2xl:pt-0">
                                <div className="pb-8 sm:max-w-fit mx-auto rounded-2xl mt-5 bg-[#ffffff15] backdrop-blur-md">
                                    <DeliveryPartnerSwitcher />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </CommenLayout>
    )
}

export default page


// "use client";

// import { useEffect, useState } from "react";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/orders");
//         const data = await res.json();
//         setOrders(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch orders", error);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleAccept = (id) => {
//     console.log("Accepted Order ID:", id);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-gray-600">Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Incoming Orders</h1>

//         <div className="space-y-6">
//           {orders.map((orderWrapper) => {
//             const order = orderWrapper.order[0];

//             return (
//               <div
//                 key={orderWrapper._id}
//                 className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row items-center p-4 gap-4"
//               >
//                 <img
//                   src={order.itemImg}
//                   alt={order.itemName}
//                   className="w-24 h-24 object-cover rounded-lg border"
//                 />
//                 <div className="flex-1">
//                   <h2 className="text-xl font-bold text-gray-800">{order.itemName}</h2>
//                   <p className="text-sm text-gray-600">{order.itemDecription}</p>

//                   <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
//                     <p><strong>Qty:</strong> {order.quantity}</p>
//                     <p><strong>Price:</strong> Rs. {order.itemPrice}</p>
//                     <p><strong>Amount:</strong> Rs. {order.amount}</p>
//                     <p><strong>Status:</strong> <span className="text-green-600 font-medium">{order.deliveryStatus}</span></p>
//                     <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() => handleAccept(orderWrapper._id)}
//                     className="mt-4 md:mt-0 px-5 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg shadow hover:scale-105 transition"
//                   >
//                     Accept
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
