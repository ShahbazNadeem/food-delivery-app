import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        loadFoodItems()
    }, [])

    const loadFoodItems = async () => {
        try {
            setLoading(true)
            let restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
            let resto_id = restaurantData._id
            let res = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`)
            res = await res.json()

            if (res.success) {
                setFoodItems(res.result)
            } else {
                toast.error("Food items are not loading properly")
            }
        } catch (error) {
            toast.error("Network error while loading food items")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteFoodItem = async (id) => {
        try {
            let response = await fetch(`/api/restaurant/foods/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Item deleted successfully');
                loadFoodItems();
            } else {
                toast.error("Failed to delete item.");
            }
        } catch (error) {
            toast.error("Network or server error.");
            console.error(error);
        }
    };

    const renderSkeletonRow = (index) => (
        <tr key={index} className="animate-pulse border-t">
            <td className="p-2"><div className="h-4 bg-gray-300 rounded w-6"></div></td>
            <td className="p-2"><div className="h-4 bg-gray-300 rounded w-24"></div></td>
            <td className="p-2"><div className="h-4 bg-gray-300 rounded w-16"></div></td>
            <td className="p-2"><div className="h-4 bg-gray-300 rounded w-40"></div></td>
            <td className="p-2"><div className="h-20 w-20 bg-gray-300 rounded"></div></td>
            <td className="p-2"><div className="h-4 bg-gray-300 rounded w-12"></div></td>
        </tr>
    )

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
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => renderSkeletonRow(index))
                    ) : (
                        foodItems?.map((item, key) => (
                            <tr key={key} className='font-medium text-gray-900 whitespace-nowrap border-t'>
                                <td>{key + 1}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemPrice} Rs</td>
                                <td>{item.itemDecription}</td>
                                <td>
                                    <figure>
                                        <img src={item.itemImg} width={100} height={100} alt={item.itemName} />
                                    </figure>
                                </td>
                                <td>
                                    <span className='flex gap-2'>
                                        <a onClick={() => router.push(`dashboard/${item._id}`)} className='text-blue-600 cursor-pointer'>edit</a>
                                        <a onClick={() => deleteFoodItem(item._id)} className='text-red-600 cursor-pointer'>delete</a>
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default FoodItemList
