'use client'
import React from 'react'
import CommenLayout from '@components/layout/CommenLayout'
import DeliveryPartnerSwitcher from '@components/deliveryPartner/DeliveryPartnerSwitcher'
import { useDeliveryPartner } from '@/context/DeliveryPartnerContext';

const page = () => {
    const { deliveryUser, logout } = useDeliveryPartner();

    if (deliveryUser) {
        return (
            <CommenLayout>
                not
                <button onClick={logout}>Logout</button>
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