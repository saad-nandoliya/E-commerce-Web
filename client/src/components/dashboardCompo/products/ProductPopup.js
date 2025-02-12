import React from "react";

const ProductPopup = ({ isOpen, onClose }) => {
    
    
    
    
    
    
    
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10001]">
            <div className="bg-white w-[37%] max-w-3xl p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
                    Enter Product Details
                </h2>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name:
                            </label>
                            <input
                                type="text"
                                className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Product Name"
                            />
                        </div>

                        {/* Price Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Price:
                            </label>
                            <input
                                type="number"
                                className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Price"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Category Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category:
                            </label>
                            <select className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home & Living</option>
                                <option value="beauty">Beauty & Health</option>
                            </select>
                        </div>

                        {/* Image Upload Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Image:
                            </label>
                            <input
                                type="file"
                                className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Description Input (Full Width) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description:
                        </label>
                        <textarea
                            rows="3"
                            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Product Description"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductPopup;
