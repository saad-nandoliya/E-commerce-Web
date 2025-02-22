import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginAPI = process.env.REACT_APP_LOGIN_API;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${LoginAPI}`, formData);

            console.log("Backend Response:", res.data);

            if (!res.data.user) {
                console.error("User data missing in response!");
                return;
            }

            const userPayload = {
                username: res.data.user.username,
                email: res.data.user.email,
                picture: res.data.user.picture || "https://i.pravatar.cc/100",
            };

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userInfo", JSON.stringify(userPayload));

            toast.success("User Login successfully!", {
                position: "top-right",
                autoClose: 3000,
            });

            navigate("/");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);

            toast.error("Failed to Login. Try again!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };




    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <ToastContainer />

            <div className="bg-white rounded-lg p-2 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] flex flex-col md:flex-row w-full max-w-5xl">
                <div className="w-full md:w-1/2 hidden md:flex">
                    <img
                        src={require("../../../assets/images/shopping.png")}
                        alt="Shopping and Mobile"
                        className="max-w-full h-auto rounded-lg"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">Login to your account</h2>
                    <p className="text-gray-600 mb-6">Enter your details below</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name="email"
                            value={formData.email}
                            required
                            placeholder="Email"
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            onChange={handleInputChange}
                            name="password"
                            value={formData.password}
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800">
                            Login
                        </button>
                    </form>

                    <div className="my-4 flex items-center justify-center">
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    <p className="text-center text-gray-600 mt-4">
                        Create new account?{" "}
                        <Link to="/signup" className="text-blue-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
