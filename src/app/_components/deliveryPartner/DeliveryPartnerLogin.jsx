"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDeliveryPartner } from "@/context/DeliveryPartnerContext";

const DeliveryPartnerLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const { login} = useDeliveryPartner();

  const handleUserLogin = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:3000/api/deliveryPartners/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, password }),
    });
    response = await response.json();
    if (response.success) {
      const { user } = response
      login(user);
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
            <form className="space-y-4 md:space-y-6" onSubmit={handleUserLogin}>
              <div>
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-white">Your mobile number</label>
                <input type="number" name="mobile" id="mobile" placeholder="03** *******" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
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

export default DeliveryPartnerLogin