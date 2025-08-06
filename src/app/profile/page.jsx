'use client'
import React, { useEffect } from 'react'
import CommenLayout from '../_components/layout/CommenLayout'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

const page = () => {
    const { logout, user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/user-auth')
        }
    }, [user])


    if (user) {
    return (
        <CommenLayout>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
                <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 max-w-sm w-full border border-white/20">
                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full p-1">
                            <figure><img className="rounded-full object-cover w-full h-full border-4 border-white" src={user?.img || '/images/profile/img2.png'} alt="User Avatar" /></figure>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white text-center">{user?.name}</h2>
                    <p className="text-sm text-white mt-1">Email : {user?.email}</p>
                    <p className="text-sm text-white mt-1">Contact : {user?.contact}</p>
                    <p className="text-sm text-white mt-1">City : {user?.city}</p>
                    <p className="text-sm text-white mt-1">Address : {user?.address}</p>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button className="font-semibold text-sm">
                            Edit Profile
                        </button>
                        <button onClick={logout} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </CommenLayout>
    )
    }
}

export default page