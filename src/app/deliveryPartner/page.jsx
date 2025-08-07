'use client'
import React, { useEffect, useState } from 'react'
import CommenLayout from '@components/layout/CommenLayout'
import DeliveryPartnerSwitcher from '@components/deliveryPartner/DeliveryPartnerSwitcher'
import { useDeliveryPartner } from '@/context/DeliveryPartnerContext';
import Link from 'next/link';

const page = () => {
    const { deliveryUser, logout } = useDeliveryPartner();
    const [orders, setOrders] = useState()

    useEffect(() => {
        document.title = deliveryUser ? 'Dashboard - Delivery Partner':'Delivery Partner - Login';
        fetchOrders()
    }, [deliveryUser]);


    const fetchOrders = async () => {
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
                        <span onClick={() => fetchOrders()}>Refresh</span>
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

export default page
