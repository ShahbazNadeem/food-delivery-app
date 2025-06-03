import React from 'react'
import Footer from './Footer'
import CustomerHeader from './CustomerHeader'

const CommenLayout = ({ children }) => {
    return (
        <>
            <CustomerHeader />
            <div className='my-24'>{children}</div>
            <Footer />
        </>
    )
}

export default CommenLayout