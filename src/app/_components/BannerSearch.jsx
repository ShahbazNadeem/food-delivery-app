'use client';
import React, { useEffect, useRef, useState } from 'react';

const BannerSearch = () => {
    const [locations, setLocations] = useState(['lahore', 'pindi', 'karachi']);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:3000/api/customer/locations');
                const data = await res.json();
                if (data.success) {
                    setLocations(data.result); // Uncomment when API is ready
                    console.log(data.result)
                }
            } catch (err) {
                console.error('Failed to fetch locations:', err);
            }
        })();

        const handleClickOutside = ({ target }) => {
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (location) => {
        setSelectedLocation(location);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl my-50">
            {/* Background Video */}
            <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay muted loop>
                <source src="/videos/home/homepagemainvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Inputs */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
                <h1 className="text-white mb-6 text-3xl font-bold">Find Your Favorite Food</h1>
                <div
                    className="flex w-full max-w-2xl space-x-4 p-4 shadow-lg bg-[#ffffff4d] backdrop-blur-md rounded-md relative"
                >
                    {/* Location Input */}
                    <div className="relative w-1/2" ref={dropdownRef} >
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
                                {locations.map((loc) => (
                                    <li key={loc}
                                        onClick={() => handleSelect(loc)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                                        {loc}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Search Input */}
                    <input type="text" placeholder="Enter food or restaurant name" className="w-1/2 input2" />
                </div>
            </div>
        </div>
    );
};

export default BannerSearch;