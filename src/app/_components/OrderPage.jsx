'use client'
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import userInfo from '@/lottie/userInfo.json'
const OrderPage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('User')
    if (userData) setUser(JSON.parse(userData))
  }, [])
  return (
    <section>
      <div className="">
        {user && (
          <div className="max-w-6xl mx-auto mt-6 bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
            <div className="">
              <div className="">
                <h2 className="mb-2">Customer Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>Address:</strong> {user.address}</p>
              </div>
            </div>
            <div className="w-60 h-60" ><Lottie animationData={userInfo} /></div>
          </div>
        )}
      </div>
    </section>
  )
}

export default OrderPage
