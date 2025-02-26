import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/cart";

const GetProByIdAPI = process.env.REACT_APP_GET_BY_ID_API;

const ProductsDetail = () => {
  const [products, setProducts] = useState(null);
  const { id } = useParams();
  const { addToCart, cart } = useCart()
  const navigate = useNavigate()


  const isInCart = cart.some((item) => item.id === Number(id));

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${GetProByIdAPI}${id}`);
      setProducts(res.data[0] || null);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!products) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-5xl bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 relative" >
        <div className="flex-1 flex justify-center sticky top-6 self-start">
          <div>
            <img
              src={`/uploads/productImage/${products.image}`}
            alt={products.name}
            className="w-[237px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[370px] md:h-[370px] lg:w-[400px] lg:h-[400px]  rounded-lg shadow-sm"
            />
            {isInCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="mt-2 w-full px-3 py-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700"
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(products)}
                className="mt-2 w-full px-3 py-2 bg-black text-white text-xs rounded-md hover:bg-gray-800"
              >
                Add To Cart
              </button>
            )}
          </div>

        </div>

        <div className="flex-1 flex flex-col justify-start p-4 space-y-4 overflow-y-auto bg-gray-50 rounded-lg
         [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-[rgba(231,229,229,0.64)]
  [&::-webkit-scrollbar-thumb]:bg-blue-600 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg" style={{ maxHeight: '80vh' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{products.name}</h2>
          <p>
            <strong className="inline-block">Description:</strong>
            <span dangerouslySetInnerHTML={{ __html: products.description }}></span>
          </p>

          <p className="text-xl md:text-2xl font-semibold mt-4">
            ${products.price}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;