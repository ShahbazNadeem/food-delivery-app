'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useRestaurant } from '@/context/RestaurantContext';

const BannerSearch = () => {
  const {
    locations,
    restaurants,
    searchTerm,
    setSearchTerm,
    selectedLocation,
    setSelectedLocation
  } = useRestaurant();

  const [visibleCount, setVisibleCount] = useState(4);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const dropdownRef = useRef(null);

  const visibleRestaurants = useMemo(() => {
    return restaurants.slice(0, visibleCount);
  }, [restaurants, visibleCount]);

  // loading state
  useEffect(() => {
    setIsLoading(true);
  }, [searchTerm, selectedLocation]);

  useEffect(() => {
    if (restaurants.length) {
      setIsLoading(false);
    }
  }, [restaurants]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <section>
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl mt-30">
          <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop>
            <source src="/videos/home/homepagemainvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
            <h1 className="text-white mb-6 text-3xl font-bold">
              Find Your Favorite Food
            </h1>
            <div className="flex w-full max-w-2xl space-x-4 p-4 shadow-lg bg-[#ffffff4d] backdrop-blur-md rounded-md">
              <div className="relative w-1/2" ref={dropdownRef}>
                <input
                  type="text"
                  placeholder="Select place"
                  className="w-full input2"
                  onFocus={() => setShowDropdown(true)}
                  value={selectedLocation}
                  readOnly
                />
                {showDropdown && (
                  <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-50">
                    {locations?.map((loc) => (
                      <li
                        key={loc}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="text"
                placeholder="Enter food or restaurant name"
                className="w-1/2 input2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-center mt-10">Restaurants near you</h2>
        <div className="wrapper mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <RestaurantCardSkeleton key={i} />)
            : visibleRestaurants?.map(({ id, name, city, contact }) => (
              <div
                key={id}
                className="relative h-72 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 group"
              >
                <img
                  src="/images/download.jpg"
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="relative z-10 bg-black/50 backdrop-blur-[2px] h-full w-full text-white p-5 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-2">{name}</h3>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <FaMapMarkerAlt className="text-orange-400" />
                    <span>{city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <FaPhoneAlt className="text-green-400" />
                    <span>{contact}</span>
                  </div>
                  <span
                    onClick={() => router.push(`explore/${name}?id=${id}`)}
                    className="cursor-pointer mt-auto flex justify-center items-center gap-1 px-3 py-2 rounded-full border border-[#ffffff] transition-all duration-300 hover:bg-[#1a2b48] hover:text-white hover:border-[#1a2b48]"
                  >
                    View Details
                  </span>
                </div>
              </div>
            ))}
        </div>
        {!isLoading && visibleCount < restaurants.length && (
          <div className="text-center my-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Show More
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default BannerSearch;

const RestaurantCardSkeleton = () => (
  <div className="relative h-72 my-10 rounded-2xl overflow-hidden shadow-xl animate-pulse bg-gray-200">
    <div className="absolute inset-0 bg-gray-300" />
    <div className="relative z-10 p-5 flex flex-col justify-end h-full w-full">
      <div className="bg-gray-400 h-6 w-2/3 mb-2 rounded" />
      <div className="bg-gray-400 h-4 w-1/3 mb-1 rounded" />
      <div className="bg-gray-400 h-4 w-1/2 mb-4 rounded" />
      <div className="bg-gray-400 h-8 w-1/3 rounded" />
    </div>
  </div>
);
