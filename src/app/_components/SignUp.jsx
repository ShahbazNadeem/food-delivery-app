"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const SignUp = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUsers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });
    const result = await res.json();
    console.log(result);
    if (result.sucess) {
      toast.success('Registered Sucessfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUsers({
        name: "",
        email: "",
        city: "",
        address: "",
        contact: "",
        password: "",
      })
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-xl">
        <div className="w-full">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-gray-900 md:text-2xl text-center">
              Create your account!
            </h3>
            <form className="" onSubmit={handleSignUp}>
              <div className="flex flex-wrap gap-2">
                <div className="w-full sm:w-fit flex flex-col gap-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                    <input type="text" name="name" id="name" value={users.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <input type="email" name="email" id="email" value={users.email} onChange={handleChange} placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                    <input type="text" name="city" id="city" value={users.city} onChange={handleChange} placeholder="name@company.com" required />
                  </div>

                </div>

                <div className="w-full sm:w-fit flex flex-col gap-2">
                  <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                    <input type="text" name="address" id="address" value={users.address} onChange={handleChange} placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 ">Contact</label>
                    <input type="number" name="contact" id="contact" value={users.contact} onChange={handleChange} placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
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

export default SignUp