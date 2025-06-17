// src/components/Providers.jsx
'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { RestaurantProvider } from '@/context/RestaurantContext';
// Import your other providers here
// etc.

export function Provider({ children }) {
    return (
        <>
            <RestaurantProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </RestaurantProvider>
        </>
    )
}
