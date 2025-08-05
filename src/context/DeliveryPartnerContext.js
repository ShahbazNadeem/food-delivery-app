"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const DeliveryPartnerContext = createContext();

export const DeliveryPartnerProvider = ({ children }) => {
  const [deliveryUser, setDeliveryUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("deliveryUser");
    if (storedUser) {
      setDeliveryUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("deliveryUser", JSON.stringify(userData));
    setDeliveryUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("deliveryUser");
    setDeliveryUser(null);
  };

  return (
    <DeliveryPartnerContext.Provider value={{ deliveryUser, login, logout }}>
      {children}
    </DeliveryPartnerContext.Provider>
  );
};

// Custom hook for easier usage
export const useDeliveryPartner = () => useContext(DeliveryPartnerContext);
