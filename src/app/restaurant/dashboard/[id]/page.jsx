"use client"
import Layout from '@components/layout/Layout'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditFoodItems = (props) => {
    const { id } = React.use(props.params)
    const router = useRouter()
    const [items, setItems] = useState({
        itemName: "",
        itemPrice: "",
        itemImg: "",
        itemDecription: "",
    });

    useEffect(() => {
        handleLoadFoodItem()
    }, [])
    const handleLoadFoodItem = async () => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`)
            response = await response.json()

            if (response.success && response.result) {
                setItems({
                    itemName: response.result.itemName || "",
                    itemPrice: response.result.itemPrice || "",
                    itemImg: response.result.itemImg || "",
                    itemDecription: response.result.itemDecription || "",
                });
            } else {
                console.error("Failed to load item:", response.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching food item:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setItems((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleEditFood = async (e) => {
        e.preventDefault();
        let resto_id
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        if (restaurantData) { resto_id = restaurantData._id }
        const payload = {
            ...items,
            resto_id,
        };

    }
    return (
        <Layout>
            <section>
                <div className="wrapper my-28">
                    <div className="container">
                        <div className="flex flex-col justify-center items-center gap-3">
                            <h2>Update Food Item</h2>
                            <form onSubmit={handleEditFood} className='flex flex-wrap gap-2 border border-color rounded-2xl px-3 py-5 md:max-w-xl'>
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
                            <div className="flex justify-end w-full">
                                <span className='text-blue-500 cursor-pointer' onClick={() => router.push('../dashboard')}>back to food items list</span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default EditFoodItems