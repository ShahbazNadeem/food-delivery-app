'use client';

import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";

const Banner = ({ name, id, showDetails = true }) => {
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState();

    useEffect(() => {
        if (showDetails && id) {
            loadRestaurantDetails();
        }
    }, [id, showDetails]);

    const loadRestaurantDetails = async () => {
        let res = await fetch(`http://localhost:3000/api/customer/${id}`);
        res = await res.json();
        if (res.success) {
            setRestaurantDetails(res.details);
            setFoodItems(res.foodItems);
        }
    };

    return (
        <>
            <Banner.Wrapper>
                <Banner.Overlay>
                    <Banner.Title>{name}</Banner.Title>
                </Banner.Overlay>
            </Banner.Wrapper>

            {showDetails && (
                <Banner.Details>
                    <Banner.Info
                        city={restaurantDetails?.city}
                        contact={restaurantDetails?.contact}
                    />
                    <Banner.Actions />
                </Banner.Details>
            )}
        </>
    );
};

// Subcomponents
Banner.Wrapper = ({ children }) => (
    <section>
        <div className="h-[50vh] bg-[url('/images/bannerImg.jpg')] bg-cover bg-center bg-no-repeat">
            {children}
        </div>
    </section>
);

Banner.Overlay = ({ children }) => (
    <div className="bg-black/30 w-full h-full flex justify-center items-center">
        {children}
    </div>
);

Banner.Title = ({ children }) => (
    <h1 className="text-white text-3xl font-bold">{children}</h1>
);

Banner.Details = ({ children }) => (
    <section>
        <div className="wrapper">
            <div className="container">
                <div className="flex justify-between px-3 py-5">{children}</div>
            </div>
        </div>
    </section>
);

Banner.Info = ({ city, contact }) => (
    <div className="flex justify-between gap-4">
        <span>City: {city}</span>
        <span>Contact no: {contact}</span>
    </div>
);

Banner.Actions = () => (
    <div className="flex justify-between gap-4">
        <span className="flex">
            <MdOutlineStar size={20} className="cursor-pointer" />
            <MdOutlineStar size={20} className="cursor-pointer" />
            <MdOutlineStar size={20} className="cursor-pointer" />
            <MdOutlineStarBorder size={20} className="cursor-pointer" />
            <MdOutlineStarBorder size={20} className="cursor-pointer" />
        </span>
        <span>
            <GoHeart size={20} className="cursor-pointer" />
        </span>
    </div>
);

export default Banner;
