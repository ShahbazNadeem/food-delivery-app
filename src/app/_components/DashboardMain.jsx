"use client"
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import AddFoodItems from './AddFoodItems';
import FoodItemList from './FoodItemList';

const DashboardMain = () => {
    const [user, setUser] = useState(null);
    const [addItem, setAddItem] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem("restaurantUser");
        if (userData) {
            const parsedData = JSON.parse(userData);
            setUser(parsedData)
        }
    }, [])
    return (
        <div>
            <section>
                <div className="wrapper mt-24">
                    <div className="container">
                        <div className="flex justify-between items-center mx-5 sm:mx-0 bg-blue-700 p-2 md:p-5 rounded-2xl">
                            <h2 className='text-white'>Welcome, {user?.name || ""}</h2>
                            <span className='text-white rounded-full p-3 bg-[#ffffff4d]'><FaUser /></span>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="wrapper mx-5 sm:mx-0 mt-5">
                    <div className="container">
                        <button onClick={() => setAddItem(!addItem)}>Add Food</button>
                        {addItem ? <AddFoodItems /> : ""}
                    </div>
                </div>
            </section>

            <section>
                <div className="wrapper mx-5 sm:mx-0 mt-5">
                    <div className="container">
                        <FoodItemList />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashboardMain