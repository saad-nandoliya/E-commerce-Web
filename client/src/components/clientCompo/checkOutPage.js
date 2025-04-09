import { useState, useEffect } from "react";
import { useCart } from "../../context/cart";
import axios from "axios";

const CheckoutPage = () => {
    const { cart, totalAmount, setCart } = useCart();
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        country: "India",
        zip_code: "",
        phone_number: "",
        paymentMethod: "credit_card",
    });
    const userInfo = JSON.parse(localStorage.getItem("user_Id"));

    useEffect(() => {
        if (userInfo) {
            setFormData((prev) => ({
                ...prev,
                phone_number: userInfo.email_or_phone || "",
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            alert("Razorpay SDK failed to load");
            return;
        }

        const { data } = await axios.post("http://localhost:4500/createPaymentOrder", {
            amount: totalAmount,
        });

        const options = {
            key: "rzp_test_0PsAonKB4n1Cpe",
            amount: data.amount,
            currency: "INR",
            name: "E-com",
            description: "Order Payment",
            order_id: data.orderId,
            handler: async (response) => {
                const paymentData = {
                    order_id: response.razorpay_order_id,
                    user_id: userInfo.id,
                    payment_method: formData.paymentMethod,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                    amount: totalAmount,
                    cartItems: cart,
                    shipping: formData,
                };

                await axios.post("http://localhost:4500/verifyPayment", paymentData);
                console.log("💳 Sending payment data:", paymentData);
                setCart([]);
                localStorage.removeItem("cart");
                alert("Order Placed Successfully!");
            },
            prefill: {
                contact: formData.phone_number,
            },
            theme: { color: "#F97316" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.paymentMethod === "cod") {
            const orderData = {
                user_id: userInfo.id,
                total_amount: totalAmount,
                cartItems: cart,
                shipping: formData,
                payment_method: "cod",
            };

            await axios.post("http://localhost:4500/verifyPayment", orderData);
            setCart([]);
            localStorage.removeItem("cart");
            alert("Order Placed Successfully with COD!");
        } else {
            handlePayment();
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 flex justify-center">
            <div className="max-w-6xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Left Section (Form) */}
                        <div className="md:col-span-2 p-4 sm:p-6 md:p-8 border-r border-gray-200 bg-gray-50">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">🛒 Checkout</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                                {/* Shipping Address */}
                                <div className="sm:col-span-2">
                                    <h3 className="text-lg font-medium text-gray-700">Shipping Address</h3>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-600">Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder="123 Main St"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="New York"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        placeholder="New York"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        placeholder="India"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zip_code"
                                        value={formData.zip_code}
                                        onChange={handleChange}
                                        required
                                        placeholder="10001"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        required
                                        placeholder="123-456-7890"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                {/* Payment Method */}
                                <div className="sm:col-span-2 mt-4">
                                    <h3 className="text-lg font-medium text-gray-700">Payment Method</h3>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    >
                                        <option value="credit_card">Credit Card</option>
                                        <option value="upi">UPI</option>
                                        <option value="cod">Cash on Delivery</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Right Section (Price Details) */}
                        {cart.length > 0 && (
                            <div className="p-4 sm:p-6 bg-white">
                                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg sticky top-10 border border-gray-200">
                                    <h2 className="text-xl sm:text-base lg:text-2xl font-bold text-gray-800 border-b pb-3 mb-4">💰 Price Details</h2>

                                    <div className="flex justify-between font-medium lg:text-lg mb-3">
                                        <span>Price ({cart.length} items)</span>
                                        <span className="font-semibold">₹{totalAmount}</span>
                                    </div>

                                    <div className="flex justify-between font-medium lg:text-lg mb-3">
                                        <span>Delivery Charges</span>
                                        <span className="text-green-600">Free</span>
                                    </div>

                                    <div className="flex justify-between font-medium lg:text-lg mb-3 border-t pt-3">
                                        <span>Total Amount</span>
                                        <span>₹{totalAmount}</span>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full mt-4 sm:mt-5 py-2 sm:py-3 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition"
                                    >
                                        ✅ Place Order
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;