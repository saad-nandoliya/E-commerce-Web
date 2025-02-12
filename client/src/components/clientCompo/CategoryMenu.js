import React from 'react'
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const CategoryMenu = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const categories = [
        "Electronics",
        "Shoes",
        "Clothing",
        "Accessories",
        "Home & Kitchen",
    ];



    return (
        <>
            <div className="w-full md:w-1/5 p-4 md:sticky top-0">
                <div className="flex justify-between items-center md:block">
                    <h2 className="text-lg font-semibold hidden md:block">Categories</h2>
                    <FaBars
                        className="cursor-pointer md:hidden text-xl"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    />
                </div>

                {/* Categories List */}
                <ul className={`space-y-2 ${isDropdownOpen ? "block" : "hidden"} sm:min-h-screen h-full  lg:border-r md:block mt-4 `}>
                    {categories.map((category, index) => (
                        <li key={index} className="  py-2 px-3 border-b border-gray-300 cursor-pointer hover:bg-gray-200 rounded">
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default CategoryMenu