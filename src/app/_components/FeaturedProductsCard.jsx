'use client'
import React from 'react'
import FeaturedProducts from './FeaturedProducts'

const FeaturedProductsCard = ({ data }) => {
    return (
        <FeaturedProducts>
            {data.map((item) => (
                <FeaturedProducts.Card key={item._id}>
                    <FeaturedProducts.Image src={item.img} alt={item.name} item={item} />
                    <FeaturedProducts.Details>
                        <FeaturedProducts.Title>{item.name}</FeaturedProducts.Title>
                        <FeaturedProducts.Price>{item.price}</FeaturedProducts.Price>
                    </FeaturedProducts.Details>
                </FeaturedProducts.Card>

            ))}
        </FeaturedProducts>
    )
}

export default FeaturedProductsCard