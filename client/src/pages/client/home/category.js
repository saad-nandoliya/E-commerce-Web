import { useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGaKTGbbasaKki_PQWcWfqpov9WRrqi6AiFQ&s",
  },
  {
    id: 2,
    name: "Fashion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjRZhalb89FJSFsSWUQ4WB7iaMvkAU27NTQ&s",
  },
  {
    id: 3,
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    id: 4,
    name: "Books",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg4lOrrNz_CmoFcALjmGsHUSWOcCxtSoOL9A&s",
  },
  {
    id: 5,
    name: "Food",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Z4cICBVzRCk4Kc6Lpusdu5GZf0ahzSrLAQ&s",
  },
  {
    id: 6,
    name: "Beauty",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/356144042/VK/KX/MD/135520142/beauty-cosmetics-250x250.jpg",
  },
  {
    id: 7,
    name: "Sports",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3i-WNcw2IiINF0mL2tOYs8xJOB8cuuGOnNQ&s",
  },
  {
    id: 8,
    name: "Gaming",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKKyXQmYgs9KvuiUKfdtf36j9jPEXfHpPGNA&s",
  },
];

const Category = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -180, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">Categories</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-44 transform -translate-y-1/2 bg-white p-3 shadow-lg rounded-full z-10 hover:bg-gray-100 transition"
      >
        <FaArrowLeft className="text-gray-600" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-44 transform -translate-y-1/2 bg-white p-3 shadow-lg rounded-full z-10 hover:bg-gray-100 transition"
      >
        <FaArrowRight className="text-gray-600" />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide relative scroll-smooth"
      >
          <NavLink to="/categoryproduct">
        <div className="flex space-x-6">

          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[165px] border bg-white rounded-lg p-4 text-left "
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-36 object-cover rounded-md shadow-md"
              />
              <h3 className="mt-3 font-semibold text-lg text-center">{category.name}</h3>
            </div>
          ))}
        </div>
          </NavLink>
      </div>
    </div>
  );
};

export default Category;
