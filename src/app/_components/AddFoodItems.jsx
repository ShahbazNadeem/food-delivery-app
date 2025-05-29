"use client"
import React, { useState } from 'react'

const AddFoodItems = () => {

    const [items, setItems] = useState({
        itemName: "",
        itemPrice: "",
        itemImg: "",
        itemDecription: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setItems((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        let resto_id
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        if (restaurantData) { resto_id = restaurantData._id }
        const payload = {
            ...items,
            resto_id,
        };
        let res = await fetch("http://localhost:3000/api/restaurant/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        res = await res.json();
        if (res.success) {
            setItems({
                itemName: "",
                itemPrice: "",
                itemImg: "",
                itemDecription: "",
            });
            alert("thk ja rhy ho, Food item add ho gya")
        }else{
            alert("Food item add ni huwa")
        }
    }
    return (
        <>
            <section>
                <div className="wrapper mt-5">
                    <div className="container">
                        <div className="flex flex-col justify-center items-center">
                            <h2>Add new Food Items</h2>
                            <form onSubmit={handleSignUp} className='flex flex-wrap gap-2 border border-color rounded-2xl px-3 py-5 md:max-w-xl'>
                                <div className='w-full'>
                                    <label htmlFor="itemName" className="block mb-2 text-sm font-medium ">Item name</label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        id="itemName"
                                        placeholder="name of item"
                                        required
                                        value={items.itemName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="itemPrice" className="block mb-2 text-sm font-medium ">Item price</label>
                                    <input
                                        type="number"
                                        name="itemPrice"
                                        id="itemPrice"
                                        placeholder="e.g 200"
                                        required
                                        value={items.itemPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="itemImg" className="block mb-2 text-sm font-medium ">Item image</label>
                                    <input
                                        type="text"
                                        name="itemImg"
                                        id="itemImg"
                                        placeholder="img url"
                                        required
                                        value={items.itemImg}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="itemDecription" className="block mb-2 text-sm font-medium ">Description</label>
                                    <textarea
                                        placeholder="Write your message here..."
                                        name="itemDecription"
                                        id="itemDecription"
                                        className="focus:outline-none focus:ring-0 w-full p-2 border border-color rounded-xl"
                                        rows={5}
                                        required
                                        value={items.itemDecription}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className='w-full button2'>Submit</button>
                            </form>


                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default AddFoodItems