import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState()

    useEffect(() => {
        loadFoodItems()

    }, [])

    const loadFoodItems = async () => {
        let restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        let resto_id = restaurantData._id
        let res = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`)
        res = await res.json()
        if (res.success) {
            setFoodItems(res.result)
        } else {
            alert("food items arenot loading properly")
        }
    }

    const deleteFoodItem = async (id) => {
        try {
            let response = await fetch(`/api/restaurant/foods/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Item deleted successfully', { /* toast config */ });
                loadFoodItems();
            } else {
                toast.error("Failed to delete item.");
            }
        } catch (error) {
            toast.error("Network or server error.");
            console.error(error);
        }
    };


    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Your food products
                </caption>
                <thead className='text-white bg-gray-800 text-sm border-t '>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Item name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems?.map((item, key) => {
                        return (
                            <tr key={key} className='font-medium text-gray-900 whitespace-nowrap border-t'>
                                <td>{key + 1}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemPrice} Rs</td>
                                <td>{item.itemDecription}</td>
                                <td><figure><img src={item.itemImg} width={100} height={100} alt={item.itemName} /></figure></td>

                                <td className=''>
                                    <span className='flex gap-2'>
                                        <a href="#" className='text-blue-600'>edit</a>
                                        <a href="#" className='text-red-600' onClick={() => deleteFoodItem(item._id)}>delete</a>
                                    </span>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default FoodItemList