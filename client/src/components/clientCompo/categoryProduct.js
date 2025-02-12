import CategoryMenu from "./CategoryMenu";
import SearchbarSmall from "../../pages/client/home/SearchbarSmall";
import ProductCard from "./productCard";


const CategoryList = () => {


  const products = [
    {
      id: 1,
      title: "Nike Air Max",
      price: 120,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/h/o/-original-imah8affqsgkfhzc.jpeg?q=70",
      description: "High-quality running shoes."
    },
    {
      id: 2,
      title: "Adidas Running Shoes",
      price: 100,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/h/o/-original-imah8affqsgkfhzc.jpeg?q=70",
      description: "Comfortable and stylish sneakers."
    },
    {
      id: 3,
      title: "Smartphone",
      price: 299,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
      description: "Latest model with great features."
    },
    {
      id: 4,
      title: "Wireless Headphones",
      price: 80,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
      description: "Noise-cancelling wireless headphones."
    },
    {
      id: 5,
      title: "Wireless Headphones",
      price: 80,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
      description: "Noise-cancelling wireless headphones."
    },
    {
      id: 6,
      title: "Wireless Headphones",
      price: 80,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
      description: "Noise-cancelling wireless headphones."
    },
    {
      id: 7,
      title: "Wireless Headphones",
      price: 80,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=70",
      description: "Noise-cancelling wireless headphones."
    },
  ];

  return (
    <>
      <SearchbarSmall />
      <div className="flex flex-col md:flex-row lg:mb-4">
        {/* Sidebar */}

        <CategoryMenu />
        {/* Product Section */}
        <div className="w-full md:w-4/5 p-4">
          {/* <h2 className="text-2xl font-semibold text-center mb-4 ">Categories</h2> */}

          {/* Product Grid */}
          <div className="w-h-screen flex flex-wrap justify-evenly  gap-x-3 gap-y-7 ">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default CategoryList;
