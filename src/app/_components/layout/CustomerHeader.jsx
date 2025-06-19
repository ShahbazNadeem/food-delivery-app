"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import projectLogo from "@/images/projectLogo.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoCart } from "react-icons/io5";
import { useCart } from '@/context/CartContext';

const CustomerHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState();
    const { cart } = useCart();
    useEffect(() => {
        const data = localStorage.getItem("restaurantUser");
        if (data) {
            setDetails(JSON.parse(data));
        }

    }, []);
    return (
        <>
            <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full z-50 max-w-[1440px] mx-auto bg-[#ffffff4d] backdrop-blur-md rounded-full">
                <nav className="container mx-auto">
                    <div className="flex justify-between items-center flex-row-reverse md:flex-row py-3 px-5">
                        <span onClick={() => setIsOpen(true)} className="lg:hidden bg-transparent">
                            <GiHamburgerMenu size={24} />
                        </span>
                        <Link href="/">
                            <figure className="w-12 h-12">
                                <Image src={projectLogo} alt="Zufta Logo" className="w-full h-full" />
                            </figure>
                        </Link>
                        <ul className="lg:flex justify-between xl:gap-10 gap-5 font-marcellus lg:text-[14px] xl:text-[16px] hidden">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="#">Menu</Link></li>
                            <li><Link href="#">Add Restaurant</Link></li>
                        </ul>
                        <span className='lg:flex gap-3 hidden'>

                            <button>{details ? (<Link href='/restaurant/dashboard'>Dashboard</Link>) :
                                (<Link href='/restaurant'>Login / SignUp</Link>)}
                            </button>

                            {/* ✅ Cart icon with count */}
                            <Link href='/cart' className="relative cursor-pointer flex justify-center items-center gap-1 px-3 py-2 rounded-full border border-[#1a2b48] transition-all duration-300 hover:bg-[#1a2b48] hover:text-white group">
                                Cart <IoCart className="text-inherit group-hover:text-white transition-colors duration-300" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>

                        </span>
                    </div>
                </nav>
            </header>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}>
                </div>
            )}

            {/* Off-Canvas Drawer */}
            <div className={`bg-[#F8F8F8] fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto w-80 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-between items-center">
                    <figure className="w-12 h-12">
                        <Image src={projectLogo} alt="Zufta Logo" className="w-full h-full" />
                    </figure>
                    <span onClick={() => setIsOpen(false)} className=" text-gray-400 ">
                        <IoClose size={28} />
                    </span>
                </div>

                <div className="py-10 px-2 flex flex-col gap-10">
                    <ul className="flex flex-col gap-5 font-marcellus text-[16]">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="#">Menu</Link></li>
                        <li><Link href="#">Add Restaurant</Link></li>
                        {/* <button> */}
                        <Link href='/restaurant'>
                            Login / SignUp
                        </Link>
                        {/* </button> */}
                        {/* ✅ Cart in drawer */}
                        <Link href='/cart' className="relative cursor-pointer flex justify-center items-center gap-1 px-3 py-2 rounded-full border border-[#1a2b48] transition-all duration-300 hover:bg-[#1a2b48] hover:text-white group">
                            Cart <IoCart className="text-inherit group-hover:text-white transition-colors duration-300" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default CustomerHeader