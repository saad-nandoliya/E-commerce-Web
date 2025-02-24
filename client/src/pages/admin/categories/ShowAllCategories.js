import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";
import DeleteModal from "../../../components/Modal/DeleteModal"


const GetCategoryAPI = process.env.REACT_APP_CATEGORY_API;
const DeleteCategoryAPI = process.env.REACT_APP_DELETE_CATEGORY_API;

const ShowAllCategories = () => {
    const [product, setProduct] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);


    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const res = await axios.get(GetCategoryAPI);
            setProduct(res.data);
            console.log(res.data)
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const handleDelete = (id) => {
        setSelectedProductId(id);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedProductId) return;

        try {
            await axios.delete(`${DeleteCategoryAPI}/${selectedProductId}`);
            toast.success("Deleted successfully!");
            setModalOpen(false);
            setSelectedProductId(null);
            fetchAllData();
        } catch (error) {
            console.error(
                "Error deleting category:",
                error.response?.data || error.message
            );
            toast.error("Failed to delete category. Please try again.");
        }
    };

    return (
        <>
            <Hoc />
            <section id="content">
                <main>
                    <div className="flex items-center justify-between pb-4 rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Categories
                        </h2>
                        <NavLink to="/admin/addcategory" className="mt-2 sm:mt-0">
                            <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-lg shadow-md hover:bg-blue-600 transition">
                                + Add
                            </button>
                        </NavLink>
                    </div>

                    <div className="overflow-y-auto max-h-[500px] border border-gray-300 rounded-lg shadow-md 
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[rgba(231,229,229,0.64)] [&::-webkit-scrollbar-thumb]:bg-blue-600 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg">
                        <table
                            className="min-w-full table-fixed"
                        >
                            <thead className="sticky top-0 bg-gray-100 shadow-md z-10">
                                <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                    <th className="px-4 py-3">Id</th>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border border-gray-300 odd:bg-[#EEEEEE] even:bg-[#F9FAFB] transition"
                                    >
                                        <td className="px-4 py-3 text-center">{item.id}</td>
                                        <td className="px-4 py-3 flex justify-center">
                                            <img
                                                src={`/uploads/categoryImage/${item.image}`}
                                                alt={item.title}
                                                className="w-10 h-10 rounded-full border border-gray-300"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center truncate max-w-[150px]">
                                            {item.title}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <label className="relative inline-block w-8 h-4">
                                                <input type="checkbox" className="peer sr-only" />
                                                <span className="block w-full h-full bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-300"></span>
                                                <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-md transform peer-checked:translate-x-4 transition-transform duration-300"></span>
                                            </label>
                                        </td>
                                        <td className="text-center space-x-1">
                                            <NavLink to={`/admin/updatecategory/${item.id}`}>
                                                <button className="px-2 py-1 border text-blue-600 rounded-md hover:bg-gray-100 transition duration-300">
                                                    <i className="fa-solid fa-pencil text-sm"></i>
                                                </button>
                                            </NavLink>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="px-2 py-1 text-red-600 rounded-md border hover:bg-gray-100 transition duration-300"
                                            >
                                                <i className="fa-solid fa-trash text-sm"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </section>


            <DeleteModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
                fieldName={"Category"}
            />
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
};

export default ShowAllCategories;