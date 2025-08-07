// src/components/Providers.jsx
'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { RestaurantProvider } from '@/context/RestaurantContext';
import { AllFoodProvider } from '@/context/AllFoodContext';
import { DeliveryPartnerProvider } from '@/context/DeliveryPartnerContext';
import { UserProvider } from '@/context/UserContext';
import { RestaurantAdminProvider } from '@/context/RestaurantAdminContext';

export function Provider({ children }) {
    return (
        <>
            <UserProvider>
                <DeliveryPartnerProvider>
                    <RestaurantAdminProvider>
                        <RestaurantProvider>
                            <AllFoodProvider>
                                <CartProvider>
                                    {children}
                                </CartProvider>
                            </AllFoodProvider>
                        </RestaurantProvider>
                    </RestaurantAdminProvider>
                </DeliveryPartnerProvider>
            </UserProvider>
        </>
    )
}
