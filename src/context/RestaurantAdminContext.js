"use client";
import { createContext, useContext, useState, useEffect } from "react";

const RestaurantAdminContext = createContext();

export const RestaurantAdminProvider = ({ children }) => {
    const [restaurantUser, setRestaurantUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("restaurantUser");
        if (storedUser) {
            setRestaurantUser(JSON.parse(storedUser));
        }
    }, []);

    const loginRestaurantUser = (user) => {
        setRestaurantUser(user);
        localStorage.setItem("restaurantUser", JSON.stringify(user));
    };

    const logoutRestaurantUser = () => {
        setRestaurantUser(null);
        localStorage.removeItem("restaurantUser");
    };

    return (
        <RestaurantAdminContext.Provider
            value={{ restaurantUser, loginRestaurantUser, logoutRestaurantUser }}
        >
            {children}
        </RestaurantAdminContext.Provider>
    );
};

export const useRestaurantAdmin = () => useContext(RestaurantAdminContext);
