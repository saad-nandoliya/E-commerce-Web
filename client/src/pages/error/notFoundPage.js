import React from "react";
import { Link } from "react-router-dom";



const NotFound = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-red-600">404</h1>
        <p className="text-2xl md:text-5xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 
