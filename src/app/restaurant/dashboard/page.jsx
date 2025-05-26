"use client"
import Layout from '@components/layout/Layout'
import React from 'react'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("restaurantUser")
    router.push("/restaurant")

  }
  return (
    <Layout>
      <section>
        <div className="wrapper my-20">
          <div className="container">
            <h1>welcome to dashboard</h1>
            <button onClick={logout}>Sign out</button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default page