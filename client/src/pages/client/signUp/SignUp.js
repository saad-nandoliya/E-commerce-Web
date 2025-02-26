import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";


const UserRegisterAPI = process.env.REACT_APP_USER_REGISTER_API;
const GoogleRegisterAPI = process.env.REACT_APP_GOOGLE_REGISTER_API;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${UserRegisterAPI}`, userData);

      const userPayload = {
        username: userData.username,
        email: userData.email,
        picture: "",
      };

      // LocalStorage me user info store karo
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(userPayload));

      setTimeout(() => {
        if (res.status === 201) {
          toast.success(res.data.message, { autoClose: 2000 });
        }
      }, 100)
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error adding user:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const userPayload = {
          google_id: data.sub,
          email: data.email,
          username: data.name,
          picture: data.picture,
        };

        const res = await axios.post(`${GoogleRegisterAPI}`, userPayload);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userInfo", JSON.stringify(userPayload)); 
        if (res.status === 201) {
          toast.success(res.data.message);
        }
        navigate("/");
      } catch (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          console.error("Error adding user:", error);
          toast.error("Something went wrong. Please try again.");
        }
      }
    },
    onError: () => toast.error("Google Login Failed!", { autoClose: 3000 }),
  });
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className=" flex items-center justify-center">
        <ToastContainer />
        <div className="bg-white rounded-lg p-2 shadow-md flex w-full max-w-5xl">
          {/* Left Image Section */}
          <div className="w-1/2 hidden md:flex">
            <img
              src={require("../../../assets/images/shopping.png")}
              alt="Signup"
              className="max-w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Create an account</h2>
            <p className="text-gray-600 mb-6">Enter your details below</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                required
                placeholder="Username"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
                className="w-full px-4 py-2 mb-6 border rounded-lg focus:ring-2 focus:ring-red-500"
              />

              <button className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800">
                Sign up
              </button>
            </form>

            <div className="my-4 flex items-center justify-center">
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Signup Button */}
            <button
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100"
            >
              <img src={require("../../../assets/images/google.png")} alt="Google" className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-500">
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
export default SignUp;
