'use client'
import React, { useEffect, useState } from 'react'
import CommenLayout from '@components/layout/CommenLayout'
import DeliveryPartnerSwitcher from '@components/deliveryPartner/DeliveryPartnerSwitcher'
import { useDeliveryPartner } from '@/context/DeliveryPartnerContext';
import Link from 'next/link';
import { fetchWithFallback } from '@/utils/fetchWithFallback';

const page = () => {
    const { deliveryUser, logout } = useDeliveryPartner();
    const [orders, setOrders] = useState()

    useEffect(() => {
        document.title = deliveryUser ? 'Dashboard - Delivery Partner' : 'Delivery Partner - Login';
        fetchOrders()
    }, [deliveryUser]);


    const fetchOrders = async () => {
        try {
            const res = await fetchWithFallback('/orders');
            const { success, result } = await res.json();

            if (success) {
                setOrders(result);
            } else {
                console.error('Failed to load orders: Response not successful');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
        console.log('refresh')
    }

    if (!deliveryUser) {
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


    return (
        <CommenLayout>
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
                <div className="max-w-4xl mx-auto pt-20">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Incoming Orders</h1>
                    <div className="flex justify-between py-2">
                        <button><Link href='/deliveryPartner/dashboard'>Dashboard</Link></button>
                        <span onClick={fetchOrders} className="cursor-pointer text-blue-600 hover:underline">Refresh</span>
                    </div>

                    <div className="space-y-6">
                        {/* {orders.length === 0 && <p className="text-center text-gray-600">No orders available.</p>} */}
                        {/* {orders?.map((order, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center p-4 md:items-start gap-4">
                                <img
                                    src={order.image || "/default-image.jpg"}
                                    alt="item image"
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                />
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-800">{order.title || 'No Title'}</h2>
                                    <p className="text-sm text-gray-600 mt-1">{order.description || 'No description'}</p>
                                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
                                        <p><strong>Qty:</strong> {order.qty}</p>
                                        <p><strong>Price:</strong> Rs. {order.price}</p>
                                        <p><strong>Amount:</strong> Rs. {order.amount}</p>
                                        <p><strong>Status:</strong> <span className="text-green-600 font-medium">{order.status}</span></p>
                                        <p><strong>Date:</strong> {order.date}</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transform transition">
                                        Accept
                                    </button>
                                </div>
                            </div>
                        ))} */}
                        {orders?.map((orderDoc) => (
                            <div key={orderDoc._id}>
                                {orderDoc.order?.map((item, index) => (
                                    <div key={item._id + index} className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center p-4 md:items-start gap-4 mb-4">
                                        {/* Image */}
                                        <img
                                            src={item.itemImg}
                                            alt={item.itemName}
                                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                        />
                                        {/* Order Details */}
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold text-gray-800">{item.itemName}</h2>
                                            <p className="text-sm text-gray-600 mt-1">{item.itemDecription}</p>
                                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
                                                <p><strong>Qty:</strong> {item.quantity}</p>
                                                <p><strong>Price:</strong> Rs. {item.itemPrice}</p>
                                                <p><strong>Amount:</strong> Rs. {item.amount}</p>
                                                <p><strong>Status:</strong> <span className="text-green-600 font-medium">{item.deliveryStatus}</span></p>
                                                <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        {/* Accept Button */}
                                        <div className="mt-4 md:mt-0">
                                            <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transform transition">
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </CommenLayout>
    )

}

export default page
