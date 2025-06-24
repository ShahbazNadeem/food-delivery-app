'use client';
import { useEffect, useState } from "react";
import { useAllFood } from '@/context/AllFoodContext';
import { useCart } from '@/context/CartContext';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";

const Banner = ({ name, id, showDetails = true }) => {
    const { allFoods, loading } = useAllFood();
    const [filteredItems, setFilteredItems] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!loading && id) {
            const items = allFoods.filter(item => item.resto_id === id);
            setFilteredItems(items);
        }
    }, [id, loading, allFoods]);

    return (
        <>
            <Banner.Wrapper>
                <Banner.Overlay>
                    <Banner.Title>{name}</Banner.Title>
                </Banner.Overlay>
            </Banner.Wrapper>

            {showDetails && (
                <>
                    <Banner.Details>
                        <Banner.Actions />
                    </Banner.Details>
                    <Banner.Items foodItems={filteredItems} addToCart={addToCart} />
                </>
            )}
        </>
    );
};



//  Subcomponents
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
                <div className="flex justify-end px-3 py-5">{children}</div>
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
            <MdOutlineStar size={20} className="cursor-pointer hover:scale-110 transition-transform" />
            <MdOutlineStar size={20} className="cursor-pointer hover:scale-110 transition-transform" />
            <MdOutlineStar size={20} className="cursor-pointer hover:scale-110 transition-transform" />
            <MdOutlineStarBorder size={20} className="cursor-pointer hover:scale-110 transition-transform" />
            <MdOutlineStarBorder size={20} className="cursor-pointer hover:scale-110 transition-transform" />
        </span>
        <span>
            <GoHeart className="text-red-500 hover:scale-110 transition-transform cursor-pointer" size={22} />
        </span>
    </div>
);

// Banner.Items = ({ foodItems, addToCart }) => (
//     <div className="container py-10">
//         <h2 className="font-bold text-center mb-8 text-amber-700">Restaurant Food Items</h2>

//         <div className="flex flex-wrap justify-center gap-8 mx-5 sm:mx-0">
//             {foodItems?.map((item) => (
//                 <div
//                     key={item._id}
//                     className="w-full sm:w-[45%] md:w-[30%] bg-white shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-105 duration-300"
//                 >
//                     <div className="relative h-48 overflow-hidden">
//                         <img
//                             src={item.itemImg}
//                             alt={item.itemName}
//                             className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                         />
//                         <span className="absolute top-2 right-2 bg-amber-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
//                             Rs. {item.itemPrice}
//                         </span>
//                     </div>

//                     <div className="p-4 flex flex-col gap-2">
//                         <h3 className="text-xl font-semibold text-gray-800">{item.itemName}</h3>
//                         <p className="text-sm text-gray-500 line-clamp-2">{item.itemDecription}</p>

//                         <div className="mt-4 flex justify-between items-center">
//                             <div className="flex gap-2">
//                                 <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition-all">
//                                     Order Now
//                                 </button>
//                                 <span onClick={() => addToCart(item)} className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition-all">
//                                     Add to cart
//                                 </span>
//                             </div>
//                             <GoHeart className="text-red-500 hover:scale-110 transition-transform cursor-pointer" size={22} />
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>

// );
Banner.Items = ({ foodItems, addToCart }) => {
    const { loading } = useAllFood();

    return (
        <div className="container py-10">
            <h2 className="font-bold text-center mb-8 text-amber-700">Restaurant Food Items</h2>

            <div className="flex flex-wrap justify-center gap-8 mx-5 sm:mx-0">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : foodItems?.map((item) => (
                        <div
                            key={item._id}
                            className="w-full sm:w-[45%] md:w-[30%] bg-white shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-105 duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.itemImg}
                                    alt={item.itemName}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                                <span className="absolute top-2 right-2 bg-amber-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                                    Rs. {item.itemPrice}
                                </span>
                            </div>

                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="text-xl font-semibold text-gray-800">{item.itemName}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{item.itemDecription}</p>

                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition-all">
                                            Order Now
                                        </button>
                                        <span onClick={() => addToCart(item)} className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition-all">
                                            Add to cart
                                        </span>
                                    </div>
                                    <GoHeart className="text-red-500 hover:scale-110 transition-transform cursor-pointer" size={22} />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Banner;


const SkeletonCard = () => (
    <div className="w-full sm:w-[45%] md:w-[30%] bg-white shadow-xl rounded-2xl p-4 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between">
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
    </div>
);
