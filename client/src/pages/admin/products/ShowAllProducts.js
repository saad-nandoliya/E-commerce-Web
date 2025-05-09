import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";
import DeleteModal from "../../../components/Modal/DeleteModal"


// const getApi = process.env.REACT_APP_GET_API;
// const deleteApi = process.env.REACT_APP_DELETE_API;
const API = process.env.REACT_APP_API_URL;

const ShowProduct = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);




    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${API}/getallproducts`);
            setProduct(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    const handleDelete = (id) => {
        setSelectedProductId(id);
        setModalOpen(true);
    };

    const confirmDelete = async () => {

        try {
            await axios.delete(`${API}/deleteproducts/${selectedProductId}`);
            toast.success("Deleted successfully!");

            setModalOpen(false);
            setSelectedProductId(null);
            fetchProduct();
        } catch (error) {
            console.error(
                "Error deleting product:",
                error.response?.data || error.message
            );
            toast.error("Failed to delete product. Please try again.");
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";

        try {
            await axios.put(`${API}/updatestatus/${id}`, { status: newStatus });
            toast.success(`Product status updated to ${newStatus}!`);

            fetchProduct();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status.");
        }
    };


    return (
        <>
            <Hoc />
            <section id="content">
                <main>
                    {/* Add Button */}
                    <div className="flex items-center justify-between pb-4 rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
                        <NavLink to="/admin/addproduct">
                            <button className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg shadow-md hover:bg-blue-600 transition">
                                + Add
                            </button>
                        </NavLink>
                    </div>

                    {/* Scrollable Table Container */}
                    <div className="overflow-y-auto max-h-[500px] border border-gray-300 rounded-lg shadow-md 
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[rgba(231,229,229,0.64)] [&::-webkit-scrollbar-thumb]:bg-blue-600 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-lg
        ">
                        {/* Product Table */}
                        <table className="min-w-full table-fixed">
                            <thead className="sticky top-0 bg-gray-100 shadow-md z-10">
                                <tr className="text-gray-700 uppercase text-sm">
                                    <th className="px-4 py-3">Id</th>
                                    <th className="px-4 py-3">Categories</th>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3 w-52">Description</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((item) => (
                                    <tr key={item.id} className="border border-gray-300 odd:bg-[#EEEEEE] even:bg-[#F9FAFB] transition">
                                        <td className="px-4 py-3 text-center">{item.id}</td>
                                        <td className="px-4 py-3 text-center">{item.category_id}</td>
                                        <td className="px-4 py-3 flex justify-center">
                                            <img
                                                src={item.image}
                                                alt="product"
                                                className="w-10 h-10 rounded-full border border-gray-300"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">{item.name}</td>
                                        <td className="px-4 py-3 text-center truncate max-w-[200px]" dangerouslySetInnerHTML={{ __html: item.description }}></td>
                                        <td className="px-4 py-3 text-center">{item.price}</td>
                                        <td className="px-4 py-3 text-center">
                                            <label className="relative inline-block w-8 h-4">
                                                <input
                                                    type="checkbox"
                                                    checked={item.status === "active"}
                                                    onChange={() => toggleStatus(item.id, item.status)}
                                                    className="peer sr-only" />
                                                <span className="block w-full h-full bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-500 transition-colors duration-300"></span>
                                                <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-md transform peer-checked:translate-x-4 transition-transform duration-300"></span>
                                            </label>
                                        </td>
                                        <td className="text-center space-x-1">
                                        
                                            <NavLink to={`/admin/updateproduct/${item.id}`}>
                                                <button className="px-2 py-1 border text-blue-600 rounded-md hover:bg-gray-100 transition duration-300">
                                                    <i className="fa-solid fa-pencil text-sm"></i>
                                                </button>
                                            </NavLink>

                                            {/* Delete Button */}
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
                fieldName={"Product"}

            />
            <ToastContainer position="top-right" autoClose={2000} />

        </>
    );
};

export default ShowProduct;
