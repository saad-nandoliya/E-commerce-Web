import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";

const AddCategoryAPI = process.env.REACT_APP_ADD_CATEGORY_API;

const AddCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        image: "",
        title: "",
    });

    console.log(category)

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
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
        const formData = new FormData();
        formData.append("image", category.image);
        formData.append("title", category.title);

        try {
            axios.post(`${AddCategoryAPI}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setTimeout(() => {
                toast.success("Category added successfully!");
            }, 100);
            navigate("/admin/allcategories");
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
            } else {
                console.error("Request Error:", error.message);
            }
            toast.error("Failed to Added Category. Please try again.");
        }
    };

    return (
        <>
            <Hoc />
            <section id="content">
                <main className="flex-1 flex justify-center items-center bg-gray-100 h-screen ">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg flex flex-col space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 text-center">
                            Add Category
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
                            Add Category
                        </button>
                    </form>
                </main>
            </section>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
};

export default AddCategory;
