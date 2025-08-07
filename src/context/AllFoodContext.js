'use client';
import { fetchWithFallback } from '@/utils/fetchWithFallback';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AllFoodContext = createContext();

export const AllFoodProvider = ({ children }) => {
    const [allFoods, setAllFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchAllFoods = async () => {
    //         try {
    //             const res = await fetch('http://localhost:3000/api/restaurant/foods');
    //             const data = await res.json();
    //             if (data.success) {
    //                 setAllFoods(data.result);
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch food items:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAllFoods();
    // }, []);

    useEffect(() => {
        const fetchAllFoods = async () => {
            try {
                const res = await fetchWithFallback('/restaurant/foods');
                const data = await res.json();

                if (data.success) {
                    setAllFoods(data.result);
                } else {
                    console.error("Food fetch failed:", data.message || "Unknown error");
                }
            } catch (error) {
                console.error("Failed to fetch food items:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllFoods();
    }, []);

    return (
        <AllFoodContext.Provider value={{ allFoods, loading }}>
            {children}
        </AllFoodContext.Provider>
    );
};

export const useAllFood = () => useContext(AllFoodContext);
