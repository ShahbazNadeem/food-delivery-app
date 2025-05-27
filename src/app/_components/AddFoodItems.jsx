"use client"
import React, { useState } from 'react'

const AddFoodItems = () => {

    const [users, setUsers] = useState({
        itemName: "",
        itemPrice: "",
        itemImg: "",
        itemDescription: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsers((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSignUp = (e) =>{
        e.preventDefault();
        console.log(users)
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
                                    <input type="text" name="itemName" id="itemName" placeholder="name of item" required onChange={handleChange} />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="itemPrice" className="block mb-2 text-sm font-medium ">Item price</label>
                                    <input type="number" name="itemPrice" id="itemPrice" placeholder="e.g 200" required onChange={handleChange} />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="itemImg" className="block mb-2 text-sm font-medium ">Item image</label>
                                    <input type="text" name="itemImg" id="itemImg" placeholder="img url" required onChange={handleChange} />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="itemDescription" className="block mb-2 text-sm font-medium ">Description</label>
                                    <textarea placeholder="Write your message here..." name="itemDescription" id="itemDescription" className="focus:outline-none focus:ring-0 w-full p-2 border border-color rounded-xl" rows={5} onChange={handleChange}
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