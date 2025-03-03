import { useEffect, useState } from "react";
import SearchbarSmall from "../../pages/client/home/SearchbarSmall";
import ProductCard from "./productCard";
import axios from "axios";

const getProductAPI = process.env.REACT_APP_GET_API;

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${getProductAPI}`);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <SearchbarSmall />
            <div className="max-w-6xl mx-auto px-4 py-6 mb-7">
                <h1 className="text-2xl font-semibold mb-4 text-center">
                    All Products
                </h1>

                <div className="w-h-screen flex flex-wrap justify-evenly gap-x-3 gap-y-7">
                    {products.length > 0 ? (
                        products.map((product) => (
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
                        <p className="text-center text-red-500 w-full">No products found</p>
                    )}
                </div>

            </div>
        </>
    );
};

export default AllProducts;