import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";

const updateAPI = process.env.REACT_APP_UPDATE_API;
const CategoryAPI = process.env.REACT_APP_CATEGORY_API;
const GetProByIdAPI = process.env.REACT_APP_GET_BY_ID_API;

function UpdateProducts() {
    const [products, setProducts] = useState({
        id: "",
        name: "",
        price: "",
        image: "",
        category_id: "",
        description: "",
    });

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${GetProByIdAPI}${id}`);
                setProducts(res.data[0]);
            } catch (error) {
                console.log("Error fetching products:", error);
            }
        };
        fetchAllProducts();
    }, [id]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const res = await axios.get(CategoryAPI);
                setData(res.data);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };
        fetchAllData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setProducts({
                ...products,
                image: files[0],
            });
        } else {
            setProducts({ ...products, [name]: value });
        }
    };

    const handleEditorChange = (name) => (event, editor) => {
        const data = editor.getData();
        setProducts((prevData) => ({
            ...prevData,
            [name]: data,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(products);
        const formData = new FormData();
        formData.append("name", products.name);
        formData.append("price", products.price);
        formData.append("image", products.image);
        formData.append("category_id", products.category_id);
        formData.append("description", products.description);

        try {
            const response = await axios.put(`${updateAPI}${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Server Response:", response.data);
            setTimeout(() => {
                toast.success("Product updated successfully.");

            }, 100)
            navigate("/admin/allproducts");
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
            } else {
                console.error("Request Error:", error.message);
            }
        }
    };

    return (
        <>
            <Hoc />
            <section id="content">
                <main>
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                            Update Product
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={products.name}
                                        onChange={handleChange}
                                        placeholder="Enter Product Name"
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={products.price}
                                        onChange={handleChange}
                                        placeholder="Enter Price"
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        onWheel={(e) => e.target.blur()}
                                        required
                                    />

                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>

                                    <select
                                        name="category_id"
                                        value={products.category_id}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {data.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={products.description}
                                    onChange={handleEditorChange("description")}
                                />
                            </div>

                            <div className="flex sm:justify-end justify-center space-x-3">
                                <NavLink to="/admin/allproducts">
                                    <button
                                        type="button"
                                        className="bg-gray-400 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg hover:bg-gray-500 transition font-medium"
                                    >
                                        Cancel
                                    </button>
                                </NavLink>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
                                >
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
}


export default UpdateProducts;