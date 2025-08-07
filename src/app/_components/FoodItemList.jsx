import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchFoodItems()
    }, [])

    const fetchFoodItems = async () => {
        setLoading(true)
        try {
            const restaurantData = JSON.parse(localStorage.getItem("restaurantUser")) ?? {}
            const restoId = restaurantData?._id

            if (!restoId) {
                toast.error("Restaurant ID not found in local storage.")
                return
            }

            const response = await fetch(`/api/restaurant/foods/${restoId}`)
            const result = await response.json()

            if (result.success) {
                setFoodItems(result.result) 
            } else {
                toast.error("Failed to load food items.")
            }
        } catch (error) {
            console.error("Fetch error:", error)
            toast.error("An error occurred while loading items.")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/restaurant/foods/${id}`, {
                method: 'DELETE',
            })
            const result = await response.json()

            if (result.success) {
                toast.success('Item deleted successfully.')
                fetchFoodItems()
            } else {
                toast.error('Failed to delete item.')
            }
        } catch (error) {
            console.error("Delete error:", error)
            toast.error('An error occurred while deleting item.')
        }
    }

    const renderSkeletonRow = (key) => (
        <tr key={key} className="animate-pulse border-t">
            {[6, 24, 16, 40, 80, 12].map((width, i) => (
                <td key={i} className="p-2">
                    <div className={`h-4 bg-gray-300 rounded w-${width}`} />
                </td>
            ))}
        </tr>
    )

    const renderRows = () => {
        if (loading) {
            return Array.from({ length: 5 }).map((_, i) => renderSkeletonRow(i))
        }

        if (foodItems.length === 0) {
            return (
                <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-600">
                        Your restaurant has no items yet.
                    </td>
                </tr>
            )
        }

        return foodItems.map((item, index) => (
            <tr key={item._id} className="font-medium text-gray-900 whitespace-nowrap border-t">
                <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.itemPrice} Rs</td>
                <td>{item.itemDecription}</td>
                <td>
                    <figure>
                        <img
                            src={item.itemImg}
                            width={100}
                            height={100}
                            alt={item.itemName ?? 'Food Item'}
                            className="object-cover rounded"
                        />
                    </figure>
                </td>
                <td>
                    <div className="flex gap-2">
                        <button
                            onClick={() => router.push(`dashboard/${item._id}`)}
                            className="text-blue-600 hover:underline"
                        >
                            Edit
                        </button>
                        <span
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 rounded-2xl px-2 py-1 border border-red-400 hover:text-white hover:bg-red-500 transition-all duration-300 ease-in-out cursor-pointer flex items-center" >
                            Delete
                        </span>
                    </div>
                </td>
            </tr>
        ))
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Your food products
                </caption>
                <thead className="text-white bg-gray-800 text-sm border-t">
                    <tr>
                        <th>Sr.</th>
                        <th>Item name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default FoodItemList
