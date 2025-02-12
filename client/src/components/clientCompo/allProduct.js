import SearchbarSmall from "../../pages/client/home/SearchbarSmall";
import ProductCard from "./productCard";

const allProducts = [
    {
        id: 1,
        title: "Nike Air Maxtruncate truncate ",
        price: 120,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/h/o/-original-imah8affqsgkfhzc.jpeg?q=70",
        description: "High-quality running shoes.",
    },
    {
        id: 2,
        title: "Adidas Running Shoes",
        price: 100,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/h/o/-original-imah8affqsgkfhzc.jpeg?q=70",
        description: "Comfortable and stylish sneakers.",
    },
    {
        id: 3,
        title: "Smartphone",
        price: 299,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
        description: "Latest model with great features.",
    },
    {
        id: 4,
        title: "Wireless Headphones",
        price: 80,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
        description: "Noise-cancelling wireless headphones.",
    },
    {
        id: 5,
        title: "Gaming Laptop",
        price: 999,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
        description: "High-performance laptop for gaming.",
    },
    {
        id: 6,
        title: "Digital Watch ",
        price: 50,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",

        description: "Stylish and waterproof digital watch.",
    },
    {
        id: 6,
        title: "Digital Watch ",
        price: 50,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",

        description: "Stylish and waterproof digital watch.",
    },
    {
        id: 6,
        title: "Digital Watch ",
        price: 50,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",

        description: "Stylish and waterproof digital watch.",
    },
    {
        id: 6,
        title: "Digital Watch ",
        price: 50,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",

        description: "Stylish and waterproof digital watch.",
    },
    {
        id: 6,
        title: "Digital Watch ",
        price: 50,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",

        description: "Stylish and waterproof digital watch.",
    },
    {
        id: 7,
        title: "Digital Watch ",
        price: 50,
        image:
            "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",

        description: "Stylish and waterproof digital watch.",
    },
];


const AllProducts = () => {
    return (
        <>
            <SearchbarSmall />
            <div className="max-w-6xl mx-auto px-4 py-3 ">
                <h1 className="text-2xl font-semibold mb-4 text-center">All Products</h1>

                <div className="w-h-screen flex flex-wrap justify-center gap-x-3 gap-y-7 ">
                    {allProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
