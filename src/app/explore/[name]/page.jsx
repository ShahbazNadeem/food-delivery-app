import React from 'react'
import CommenLayout from "@components/layout/CommenLayout";
import Banner from '@components/Banner';
import FeaturedProducts from '@/app/_components/FeaturedProducts';
import { detailPageFeatured } from '@/app/data/data';

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
                        <FeaturedProducts>
                            {detailPageFeatured.map((item) => (
                                <FeaturedProducts.Card key={item.id}>
                                    <FeaturedProducts.Image src={item.img} alt={item.name} />
                                    <FeaturedProducts.Details>
                                        <FeaturedProducts.Title>{item.name}</FeaturedProducts.Title>
                                        <FeaturedProducts.Price>Rs.{item.price}</FeaturedProducts.Price>
                                    </FeaturedProducts.Details>
                                </FeaturedProducts.Card>
                            ))}
                        </FeaturedProducts>
                    </div>
                </div>
            </section>
        </CommenLayout>
    )
}

export default page