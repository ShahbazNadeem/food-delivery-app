"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import projectLogo from "@/images/projectLogo.png"
import { useRouter, usePathname } from 'next/navigation';

const AuthHeader = () => {
  const router = useRouter()
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard")
    } else {
      try {
        setDetails(JSON.parse(data));
      } catch (e) {
        console.error("Error parsing restaurantUser:", e);
        router.push("/restaurant");
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);
  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full z-10 max-w-[1440px] mx-auto bg-[#ffffff4d] backdrop-blur-md rounded-full">
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
              <li><Link href="/restaurant">Resturant</Link></li>
              <li><Link href="#">Demo</Link></li>
            </ul>
            <span>
              <button className="hidden sm:block">
                {details && details.name ? (
                  pathName === "/restaurant/dashboard" ? (
                    <span onClick={() => {
                      localStorage.removeItem("restaurantUser");
                      router.push("/restaurant");
                    }}>
                      Sign out
                    </span>
                  ) : (
                    <Link href="/restaurant/dashboard">Dashboard</Link>
                  )
                ) : (
                  <Link href="/restaurant">Login / SignUp</Link>
                )}
              </button>
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
            <li><Link href="#">Premium Group Tours</Link></li>
            <li><Link href="#">Private Tours</Link></li>
            <li>
              {details && details.name ? (
                <Link href="/restaurant/dashboard">Dashboard</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AuthHeader;

