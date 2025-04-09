import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import axios from "axios";

const getProductAPI = process.env.REACT_APP_GET_API;

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedRange, setSelectedRange] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${getProductAPI}`);
            setProducts(res.data);
            setFilteredProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [selectedRange, searchTerm]);

    const applyFilters = () => {
        let result = [...products];

        // Price filter
        const [min, max] = selectedRange.split("-").map(Number);
        if (selectedRange !== "all") {
            result = result.filter((p) =>
                max ? p.price >= min && p.price <= max : p.price >= min
            );
        }

        // Search term filter
        if (searchTerm) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(result);
    };
    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-6 mb-7">
                <h1 className="text-2xl font-semibold mb-4 text-center">All Products</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center items-center">

                    <input
                        type="text"
                        placeholder="Search product name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-4 py-1 rounded-md w-full md:w-64"
                    />

                    <div className="flex gap-2 flex-wrap">
                        {[
                            { label: "All", value: "all" },
                            { label: "₹1 - ₹1000", value: "1-1000" },
                            { label: "₹1000 - ₹3000", value: "1000-3000" },
                            { label: "₹3000 - ₹5000", value: "3000-5000" },
                            { label: "₹5000+", value: "5000-" },
                        ].map(({ label, value }) => (
                            <button
                                key={value}
                                onClick={() => setSelectedRange(value)}
                                className={`px-4 py-1 rounded-full border ${selectedRange === value
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border-gray-300 text-gray-700"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>


                </div>
                {/* Product Grid */}
                <div className="w-h-screen flex flex-wrap justify-evenly gap-x-3 gap-y-7">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                status={product.status}
                            />
                        ))
                    ) : (
                        <div className="w-full text-center py-10">
                        <p className="text-2xl font-semibold text-gray-700 mb-2">Oops! Nothing found</p>
                        <p className="text-gray-500 mb-4">We couldn’t find any products matching your search.</p>
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedRange("all");
                            setFilteredProducts(products);
                          }}
                          className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
                        >
                          Reset Filters
                        </button>
                      </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
