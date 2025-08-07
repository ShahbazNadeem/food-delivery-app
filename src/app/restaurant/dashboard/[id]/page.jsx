'use client';

import { fetchWithFallback } from '@/utils/fetchWithFallback';
import Layout from '@components/layout/Layout';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditFoodItems = (props) => {
    const { id } = React.use(props.params)
    const router = useRouter();

    const [items, setItems] = useState({
        itemName: '',
        itemPrice: '',
        itemImg: '',
        itemDecription: '',
    });

    // Load food item on mount
    useEffect(() => {
        fetchFoodItem();
    }, []);

    const fetchFoodItem = async () => {
        // try {
        //     const res = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`);
        //     const data = await res.json();

        //     if (data.success && data.result) {
        //         const { itemName, itemPrice, itemImg, itemDecription } = data.result;
        //         setItems({
        //             itemName: itemName || '',
        //             itemPrice: itemPrice || '',
        //             itemImg: itemImg || '',
        //             itemDecription: itemDecription || '',
        //         });
        //     } else {
        //         console.error('Failed to load item:', data.message || 'Unknown error');
        //         toast.error('Failed to load item');
        //     }
        // } catch (err) {
        //     console.error('Error fetching food item:', err);
        //     toast.error('Something went wrong while fetching');
        // }
        try {
            const res = await fetchWithFallback(`/restaurant/foods/edit/${id}`);
            const data = await res.json();

            if (data.success && data.result) {
                const { itemName, itemPrice, itemImg, itemDecription } = data.result;

                setItems({
                    itemName: itemName || '',
                    itemPrice: itemPrice || '',
                    itemImg: itemImg || '',
                    itemDecription: itemDecription || '',
                });
            } else {
                console.error('Failed to load item:', data.message || 'Unknown error');
                toast.error('Failed to load item');
            }
        } catch (err) {
            console.error('Error fetching food item:', err);
            toast.error('Something went wrong while fetching');
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setItems((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditFood = async (e) => {
        e.preventDefault();

        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id = restaurantData?._id;

        const payload = {
            ...items,
            resto_id,
        };

        // try {
        //     const res = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(payload),
        //     });

        //     const data = await res.json();

        //     if (data.success) {
        //         toast.success('Item updated successfully');
        //         router.push('../dashboard');
        //     } else {
        //         toast.error('Failed to update item');
        //     }
        // } catch (err) {
        //     console.error('Update error:', err);
        //     toast.error('Error updating item');
        // }
        try {
            const res = await fetchWithFallback(`/restaurant/foods/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Item updated successfully');
                router.push('../dashboard');
            } else {
                toast.error('Failed to update item');
            }
        } catch (err) {
            console.error('Update error:', err);
            toast.error('Error updating item');
        }
    };

    return (
        <Layout>
            <section>
                <div className="wrapper my-28">
                    <div className="container">
                        <div className="flex flex-col justify-center items-center gap-3">
                            <h2>Update Food Item</h2>
                            <form
                                onSubmit={handleEditFood}
                                className="flex flex-wrap gap-2 border border-color rounded-2xl px-3 py-5 md:max-w-xl"
                            >
                                <InputField
                                    label="Item Name"
                                    name="itemName"
                                    value={items.itemName}
                                    onChange={handleChange}
                                    placeholder="Name of item"
                                />

                                <InputField
                                    label="Item Price"
                                    name="itemPrice"
                                    type="number"
                                    value={items.itemPrice}
                                    onChange={handleChange}
                                    placeholder="e.g. 200"
                                />

                                <InputField
                                    label="Item Image"
                                    name="itemImg"
                                    value={items.itemImg}
                                    onChange={handleChange}
                                    placeholder="Image URL"
                                />

                                <div className="w-full">
                                    <label htmlFor="itemDecription" className="block mb-2 text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        name="itemDecription"
                                        id="itemDecription"
                                        rows={5}
                                        className="focus:outline-none focus:ring-0 w-full p-2 border border-color rounded-xl"
                                        placeholder="Write your message here..."
                                        required
                                        value={items.itemDecription}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="w-full button2">
                                    Submit
                                </button>
                            </form>

                            <div className="flex justify-end w-full">
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => router.push('../dashboard')}
                                >
                                    Back to food items list
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </Layout>
    );
};

const InputField = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
    <div className="w-full">
        <label htmlFor={name} className="block mb-2 text-sm font-medium">
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            required
            className="w-full p-2 border border-color rounded-xl"
            value={value}
            onChange={onChange}
        />
    </div>
);

export default EditFoodItems;
