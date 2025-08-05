// src/components/Providers.jsx
'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { RestaurantProvider } from '@/context/RestaurantContext';
import { AllFoodProvider } from '@/context/AllFoodContext';
import { DeliveryPartnerProvider } from '@/context/DeliveryPartnerContext';

export function Provider({ children }) {
    return (
        <>
            <DeliveryPartnerProvider>
                <RestaurantProvider>
                    <AllFoodProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </AllFoodProvider>
                </RestaurantProvider>
            </DeliveryPartnerProvider>
        </>
    )
}
