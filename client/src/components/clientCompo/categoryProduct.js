import CategoryMenu from "./CategoryMenu";
import ProductCard from "./productCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// const getProductsByCategoryAPI = process.env.REACT_APP_GET_PRO_BY_CATEGORY_API;
const API = process.env.REACT_APP_API_URL;


const CategoryList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedRange, setSelectedRange] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { category_id } = useParams();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${API}/getproductsbycategory/${category_id}`);
        setProducts(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchAllProducts();
  }, [category_id]);

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

    setFiltered(result);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row lg:mb-4">
        <CategoryMenu />

        <div className="w-full md:w-4/5 p-4">
          {/* 🔍 Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">

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

          {/* 📦 Product Grid */}
          <div className="w-h-screen flex flex-wrap sm:justify-center justify-around gap-x-3 gap-y-7">
            {filtered.length > 0 ? (
              filtered.map((product) => (
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
                  setFiltered(products);
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
              >
                Reset Filters
              </button>
            </div>
            
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
