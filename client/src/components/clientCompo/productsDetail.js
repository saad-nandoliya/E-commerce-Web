const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 120,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAVsZ29scV7utpBzB9ob9mWmXShjRVBAdVQ&s",
      description: "High-quality running shoes for comfort and style.",
    },
    {
      id: 2,
      name: "Adidas Running Shoes",
      price: 100,
      image: "https://via.placeholder.com/400",
      description: "Perfect for long-distance running with excellent grip.",
    },
    {
      id: 3,
      name: "Smartphone",
      price: 299,
      image: "https://via.placeholder.com/400",
      description:
        "Latest model with great features and high-resolution display.",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: 80,
      image: "https://via.placeholder.com/400",
      description: "Noise-cancelling, high-quality sound experience.",
    },
  ];
  
  const ProductDetail = () => {
    const product = products[0]; // Show first product (Static for now)
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-5xl bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row gap-10">
          {/* left Side: Product Image */}
          <div className="flex-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
  
          {/* right Side: Product Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-2xl font-semibold mt-4">${product.price}</p>
  
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
              Add to Cart
            </button>
  
           
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductDetail;
  