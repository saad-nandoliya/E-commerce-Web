import React from 'react'
import {NavLink} from "react-router-dom"

const productCard = ({ image, title, price, onAddToCart }) => {
    return (
        <>
            <div

                className="w-[122px] h-[265px] md:w-[160px] rounded-lg p-3 flex flex-col items-center bg-white shadow-lg"
            >

                <NavLink to="/productsdetail">
                    <img
                        src={image}
                        alt={title}
                        className="w-[150px] h-[150px] object-contain rounded-md"
                    />

                </NavLink>

                <h2 className="mt-2 mb-2 font-medium text-center text-sm w-full truncate">
                    {title}
                </h2>

                <p className="text-gray-600 text-xs">${price}</p>

                <button onClick={onAddToCart} className="w-full mt-2 px-3 py-2 bg-black text-white  text-xs rounded-md hover:bg-gray-800">
                    Add To Cart
                </button>
            </div>
        </>
    )
}

export default productCard