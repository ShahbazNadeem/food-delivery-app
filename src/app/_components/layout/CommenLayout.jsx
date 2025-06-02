import React from 'react'
import Footer from './Footer'
import CustomerHeader from './CustomerHeader'

const CommenLayout = ({ children }) => {
    return (
        <>
            <CustomerHeader />
            {children}
            <Footer />
        </>
    )
}

export default CommenLayout