import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 2,
        title: "Smart Watch",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        image: "https://images.unsplash.com/photo-1588131153911-a4ea5189fe19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 4,
        title: "Laptop Stand",
        image: "https://images.unsplash.com/photo-1629317480826-910f729d1709?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fExhcHRvcCUyMFN0YW5kfGVufDB8fDB8fHww",
    },
    {
        id: 5,
        title: "Portable Charger",
        image: "https://images.unsplash.com/photo-1521372557841-004496c23b26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UG9ydGFibGUlMjBDaGFyZ2VyfGVufDB8fDB8fHww",
    },
    {
        id: 6,
        title: "Wireless Mouse",
        image: "https://images.unsplash.com/photo-1707592691247-5c3a1c7ba0e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V2lyZWxlc3MlMjBNb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    },
];


const Product = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-6 relative">
            <div className="flex justify-between mt-6 px-4 sm:px-9 ">
                <h2 className="text-2xl font-semibold mb-4 text-center">Products</h2>
                <NavLink to="/allproduct">

                    <button className="bg-black text-white p-3 rounded-md">
                       <FaArrowRight />
                    </button>
                </NavLink>
            </div>

            <div className="flex flex-wrap justify-evenly gap-3">
                {products.map((pro) => (
                    <div
                        key={pro.id}
                        className="w-[122px] h-[220px] md:w-[150px] rounded-lg p-3 flex flex-col items-center"
                    >
                        <img
                            src={pro.image}
                            alt={pro.title}
                            className="w-[150px] h-[150px] object-cover rounded-md"
                        />
                        <h3 className="mt-2 font-medium text-center text-sm">{pro.title}</h3>
                    </div>
                ))}
            </div>


        </div>

    );
};

export default Product;
