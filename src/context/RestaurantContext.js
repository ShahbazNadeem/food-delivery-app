'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/customer/locations');
      const { success, result } = await res.json();
      if (success) setLocations(result);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  }, []);

  const fetchRestaurants = useCallback(async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const url = `http://localhost:3000/api/customer${query ? `?${query}` : ''}`;
      const res = await fetch(url);
      const { success, result } = await res.json();

      if (success && Array.isArray(result)) {
        const formatted = result.map(({ _id, password, ...rest }) => ({
          ...rest,
          id: _id,
        }));
        setRestaurants(formatted);
      }
    } catch (err) {
      console.error('Error fetching restaurants:', err);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filters = {};
      if (searchTerm.trim()) {
        filters.restaurant = searchTerm.trim();
      } else if (selectedLocation) {
        filters.location = selectedLocation;
      }
      fetchRestaurants(filters);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedLocation, fetchRestaurants]);

  const contextValue = {
    locations,
    restaurants,
    searchTerm,
    setSearchTerm,
    selectedLocation,
    setSelectedLocation,
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
