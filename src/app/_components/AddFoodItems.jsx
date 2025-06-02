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

    const handleAddFood= async (e) => {
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
        } else {
            alert("Food item add ni huwa")
        }
    }
    return (
        <>
         
{/* <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
    </svg>
  </div>
  <div className="w-full">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
  </div>
  <span className="sr-only">Loading...</span>
</div> */}


            <section>
                <div className="wrapper mt-5">
                    <div className="container">
                        <div className="flex flex-col justify-center items-center">
                            <h2>Add new Food Items</h2>
                            <form onSubmit={handleAddFood} className='flex flex-wrap gap-2 border border-color rounded-2xl px-3 py-5 md:max-w-xl'>
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