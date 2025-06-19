// src/components/Providers.jsx
'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { RestaurantProvider } from '@/context/RestaurantContext';
import { AllFoodProvider } from '@/context/AllFoodContext';
// Import your other providers here
// etc.

export function Provider({ children }) {
    return (
        <>
            <RestaurantProvider>
                <AllFoodProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </AllFoodProvider>
            </RestaurantProvider>
        </>
    )
}
