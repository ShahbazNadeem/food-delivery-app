"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const DeliveryPartnerSignup = () => {
    const [users, setUsers] = useState({
        name: "",
        email: "",
        city: "",
        address: "",
        mobile: "",
        password: "",
    });
    const [signedUp, setSignedUp] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsers((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleUserUserSignUp = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3000/api/deliveryPartners/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(users),
            });


            if (!res.ok) {
                const err = await res.json();
                console.error("Backend returned error:", err);
                toast.error("Something went wrong!");
                return;
            }

            res = await res.json();
            console.log(res)

            if (res.success) {
                toast.success('Registered Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "dark",
                });
                const { result } = res;
                delete result.password;
                setSignedUp(true)
                setUsers({
                    name: "",
                    email: "",
                    city: "",
                    address: "",
                    mobile: "",
                    password: "",
                })

                // localStorage.setItem("User", JSON.stringify(result));
            } else {
                toast.error(res.result || "Registration failed", {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "dark",
                });
            }
        } catch (err) {
            console.error("Fetch failed:", err);
            toast.error("Network or server error.");
        }
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-xl">
                <div className="w-full">
                    <div className="space-y-4 md:space-y-6">
                        <h3 className="md:text-2xl text-center text-white">
                            Create your new account!
                        </h3>
                        {signedUp &&
                            <h3 className="md:text-2xl text-center text-white">
                                Now login first
                            </h3>
                        }
                        <form onSubmit={handleUserUserSignUp}>
                            <div className="flex flex-wrap gap-2 text-white">
                                <div className="w-full sm:w-fit flex flex-col gap-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium">Your name</label>
                                        <input type="text" name="name" id="name" value={users.name} onChange={handleChange} placeholder="Your name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                        <input type="email" name="email" id="email" value={users.email} onChange={handleChange} placeholder="name@company.com" required />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium">City</label>
                                        <input type="text" name="city" id="city" value={users.city} onChange={handleChange} placeholder="lahore" required />
                                    </div>

                                </div>

                                <div className="w-full sm:w-fit flex flex-col gap-2">
                                    <div>
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium">Address</label>
                                        <input type="text" name="address" id="address" value={users.address} onChange={handleChange} placeholder="str#123 City Country" required />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile" className="block mb-2 text-sm font-medium">Contact</label>
                                        <input type="tel" name="mobile" id="mobile" value={users.mobile} onChange={handleChange} placeholder="1234-6789101" autoComplete="tel" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                        <input type="password" name="password" id="password" value={users.password} onChange={handleChange} placeholder="••••••••" required />
                                    </div>
                                </div>
                            </div>


                            <button type="submit" className="w-full mt-5">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default DeliveryPartnerSignup