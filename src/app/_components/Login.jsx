"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSignIn = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, login: true }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response
      delete result.password
      localStorage.setItem("restaurantUser", JSON.stringify(result))
      router.push("/restaurant/dashboard");
    } else {
      alert("login failed");

    }
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-lg">
        <div className="w-full">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-white md:text-2xl text-center">
              Sign in
            </h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                <input type="email" name="email" id="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="w-full">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;

