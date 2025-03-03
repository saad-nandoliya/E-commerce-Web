import { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "credit_card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully! 🎉");
    console.log("User Details:", formData);
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">🛒 Checkout</h2>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input type="text" name="name" placeholder="Full Name" required
            className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required
            className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="text" name="address" placeholder="Street Address" required
            className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="text" name="city" placeholder="City" required
            className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="text" name="zip" placeholder="ZIP Code" required
            className="w-full p-2 border rounded" onChange={handleChange} />

          {/* Payment Method */}
          <select name="paymentMethod" className="w-full p-2 border rounded" onChange={handleChange}>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>

          {/* Submit Button */}
          <Link to="/ordertrack">
            <button type="submit" className="w-full bg-black text-white p-2 rounded">
              Place Order
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;