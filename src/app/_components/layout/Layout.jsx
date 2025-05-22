import React from 'react'
// import Navbar from './Navbar'
import Footer from './Footer'
import AuthHeader from './AuthHeader'

const Layout = ({ children }) => {
    return (
        <>
            <AuthHeader />
            {children}
            <Footer />
        </>
    )
}

export default Layout