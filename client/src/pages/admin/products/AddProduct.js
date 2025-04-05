import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";

const AddApi = process.env.REACT_APP_ADD_API;
const CategoryApi = process.env.REACT_APP_CATEGORY_API;

const AddProduct = () => {
    const [products, setProducts] = useState({
        name: "",
        price: "",
        image: "",
        category_id: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(CategoryApi);
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setProducts({ ...products, image: files[0] });
        } else {
            setProducts({ ...products, [name]: value });
        }
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!products.name.trim()) newErrors.name = "Name is required";
        else if (!products.price) newErrors.price = "Price is required";
        else if (parseFloat(products.price) < 0) newErrors.price = "Price cannot be negative";
        else if (!products.category_id) newErrors.category_id = "Category is required";
        else if (!products.image) newErrors.image = "Image is required";
        else if (!products.description.trim()) newErrors.description = "Description is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("name", products.name);
        formData.append("price", products.price);
        formData.append("image", products.image);
        formData.append("category_id", products.category_id);
        formData.append("description", products.description);

        try {
            await axios.post(AddApi, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

           setTimeout(() => {
            toast.success("Product added successfully!");
           }, 100)
            navigate("/admin/allproducts");
        } catch (error) {
            console.error("Error adding product:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Hoc />
            <section id="content">
                <main>
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={products.name}
                                        onChange={handleChange}
                                        placeholder="Enter Product Name"
                                        className={`w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? "border-red-500" : ""
                                            }`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={products.price}
                                        onChange={handleChange}
                                        placeholder="Enter Price"
                                        className={`w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.price ? "border-red-500" : ""
                                            }`}
                                        onWheel={(e) => e.target.blur()}
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                            </div>

                            {/* Category & Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="category_id"
                                        value={products.category_id}
                                        onChange={handleChange}
                                        className={`w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.category_id ? "border-red-500" : ""
                                            }`}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className={`w-full mt-1 p-3 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 ${errors.image ? "border-red-500" : ""
                                            }`}
                                    />
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={products.description}
                                    onChange={(event, editor) => {
                                        setProducts({ ...products, description: editor.getData() });
                                        setErrors({ ...errors, description: "" });
                                    }}
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3">
                                <NavLink to="/admin/allproducts">
                                    <button type="button" className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition font-medium">
                                        Cancel
                                    </button>
                                </NavLink>
                                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </main>
            </section>
        </>
    );
};

export default AddProduct;
