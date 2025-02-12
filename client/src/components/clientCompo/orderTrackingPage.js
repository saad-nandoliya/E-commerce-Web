import { Link } from "react-router-dom";

const OrderTracking = () => {
  const orderStatus = "Shipped"; // Example Status (Processing, Shipped, Delivered)
  const trackingId = "TRK123456";
  const estimatedDelivery = "Feb 5, 2025";

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">📦 Track Your Order</h2>

        {/* Order Details */}
        <div className="mt-4 space-y-3">
          <p className="text-gray-800"><strong>Order Status:</strong> {orderStatus}</p>
          <p className="text-gray-800"><strong>Tracking ID:</strong> {trackingId}</p>
          <p className="text-gray-800"><strong>Estimated Delivery:</strong> {estimatedDelivery}</p>
        </div>

        {/* Status Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div className={`h-2 rounded-full bg-green-500 ${orderStatus === "Shipped" ? "w-2/3" : "w-1/3"}`}></div>
        </div>

        {/* Back to Shopping Button */}
       <Link to="/">
       <button className="mt-6 w-full bg-black text-white p-2 rounded">
          Continue Shopping
        </button>
       </Link>
      </div>
    </div>
  );
};

export default OrderTracking;
