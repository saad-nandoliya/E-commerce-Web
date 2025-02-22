import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";

const UpdateCategoryAPI = process.env.REACT_APP_UPDATE_CATEGORY_API;
const GetCategoryByIdAPI = process.env.REACT_APP_GET_CATEGORY_BY_ID_API;

const UpdateCategory = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [category, setCategory] = useState({
        image: "",
        title: "",
    });

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${GetCategoryByIdAPI}${id}`);
                setCategory(res.data[0]);
            } catch (error) {
                console.log("Error fetching products:", error);
            }
        };
        fetchAllProducts();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            setCategory({
                ...category,
                image: files[0],
            });
        } else {
            setCategory({ ...category, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Updating Category with ID:", id);
        console.log("Form Data Before Sending:", category);

        const formData = new FormData();
        formData.append("image", category.image);
        formData.append("title", category.title);

        try {
            const response = await axios.put(`${UpdateCategoryAPI}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Server Response:", response.data);
            setTimeout(() => {
                toast.success("Category updated successfully!");
            }, 100);
            navigate("/admin/allcategories");
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
            } else {
                console.error("Request Error:", error.message);
            }
            toast.error("Failed to update category. Please try again.");
        }
    };

    return (
        <>
            <Hoc />
            <section id="content">
                <main className="flex-1 flex justify-center items-center bg-gray-100 h-screen">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg flex flex-col space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 text-center">
                            Update Category
                        </h2>

                        <label htmlFor="image" className="text-gray-700 font-medium">
                            Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            className="border border-gray-300 p-2 rounded-md w-full"
                            onChange={handleChange}
                        />

                        <label htmlFor="title" className="text-gray-700 font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="border border-gray-300 p-2 rounded-md w-full"
                            value={category.title}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Update Category
                        </button>
                    </form>
                </main>
            </section>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
};

export default UpdateCategory;