import React from 'react'
import CommenLayout from "@components/layout/CommenLayout";
import Banner from '@components/Banner';

const page = () => {
    return (
        <CommenLayout>
            <section>
                <div className="wrapper">
                    <Banner />
                </div>
            </section>
        </CommenLayout>
    )
}

export default page