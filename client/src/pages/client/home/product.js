// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import axios from "axios";

// // const getProductsAPI = process.env.REACT_APP_GET_API;
// const API = process.env.REACT_APP_API_URL;

// const Product = () => {
//   const [product, setProduct] = useState([]);

//   const navigate = useNavigate();
//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`${API}/getallproducts`);
//       const randomProducts = getRandomItems(res.data, 6);
//       setProduct(randomProducts);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getRandomItems = (array, count) => {
//     let result = [];
//     const shuffled = [...array].sort(() => 0.5 - Math.random());
//     result = shuffled.slice(0, count);
//     return result;
//   };
//   const navigateProducts = (id) => {
//     navigate(`/productsdetail/${id}`);
//   };
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6 relative">
//       <div className="flex justify-between px-14 sm:px-9">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Products</h2>
//         <Link to="/allproduct">
//           <button className="bg-gray-100 text-black shadow-lg p-3 rounded-md">
//             <FaArrowRight />
//           </button>
//         </Link>
//       </div>
//       <div className="flex flex-wrap justify-evenly gap-3">
//         {product.map((pro) => (
//           <div
//             key={pro.id}
//             className="w-[122px] h-[220px] md:w-[150px] rounded-md p-3 flex flex-col items-center"
//           >
//             <img
//               onClick={() => navigateProducts(pro.id)}
//               src={`/uploads/productImage/${pro.image}`}
//               alt={pro.name}
//               className="w-[150px] h-[150px] object-cover rounded-md"
//             />
//             <h3 className="mt-2 font-medium text-center text-sm">{pro.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Product;


import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

// const getProductsAPI = process.env.REACT_APP_GET_API;
const API = process.env.REACT_APP_API_URL;

const Product = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API}/getallproducts`);
      if (Array.isArray(res.data)) {
        const randomProducts = getRandomItems(res.data, 6);
        setProduct(randomProducts);
      } else {
        console.error("Unexpected product data format:", res.data);
        setProduct([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
      setProduct([]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const navigateProducts = (id) => {
    navigate(`/productsdetail/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 relative">
      <div className="flex justify-between px-14 sm:px-9">
        <h2 className="text-2xl font-semibold mb-4 text-center">Products</h2>
        <Link to="/allproduct">
          <button className="bg-gray-100 text-black shadow-lg p-3 rounded-md">
            <FaArrowRight />
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : product.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="flex flex-wrap justify-evenly gap-3">
          {product.map((pro) => (
            <div
              key={pro.id}
              className="w-[122px] h-[220px] md:w-[150px] rounded-md p-3 flex flex-col items-center"
            >
              <img
                onClick={() => navigateProducts(pro.id)}
                src={`/uploads/productImage/${pro.image}`}
                alt={pro.name}
                className="w-[150px] h-[150px] object-cover rounded-md cursor-pointer"
              />
              <h3 className="mt-2 font-medium text-center text-sm">{pro.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
