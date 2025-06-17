import React from 'react'
import CommenLayout from "@components/layout/CommenLayout";
import Banner from '@components/Banner';
import { detailPageFeatured } from '@/app/data/data';
import FeaturedProductsCard from '@components/FeaturedProductsCard';

export const metadata = {
    title: 'Restaurant Detail Page',
    description: 'Login or sign up to access the Restaurant app.',
};

const page = ({ params, searchParams }) => {
    const name = params.name;
    const id = searchParams.id;
    return (
        <CommenLayout>
            <section>
                <div className="wrapper">
                    <Banner name={decodeURI(name)} id={id} showDetails={true} />
                </div>
            </section>

            <section>
                <div className="wrapper">
                    <div className="container">
                        <FeaturedProductsCard data={detailPageFeatured}/>
                    </div>
                </div>
            </section>
        </CommenLayout>
    )
}

export default page