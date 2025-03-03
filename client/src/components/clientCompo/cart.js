
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../context/category";


const Cart = () => {
  const { cart, totalAmount, increaseQty, decreaseQty, removeItem } = useCart();
  const { categories } = useCategories();
  const navigate = useNavigate();


  return (
    <div className="min-h-screen container mx-auto flex flex-col lg:flex-row gap-6 py-5">
      {/* Left: Cart Items */}
      <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        {cart.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 border-b">
                <img src={`/uploads/productImage/${item.image}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{item.name}</span>
                    <span className="text-lg font-semibold">${item.price * item.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button className="text-white bg-gray-800 rounded px-3 py-1" onClick={() => decreaseQty(item.id)}>
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button className="text-white bg-gray-800 rounded px-3 py-1" onClick={() => increaseQty(item.id)}>
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                    <button className="text-red-500 text-lg" onClick={() => removeItem(item.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center text-gray-500">Your cart is empty</p>
            <button
              onClick={() => navigate(`/categoryproduct/${categories[0].id}`)}
              className="text-center text-gray-500">go to shopping</button>
          </div>
        )}
      </div>

      {/* Right: Price Details & Checkout */}
      {cart.length > 0 && (
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow sticky top-20">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Price Details</h2>
            <div className="flex justify-between text-lg font-medium mb-2">
              <span>Price ({cart.length} items)</span>
              <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium mb-2">
              <span>Discount</span>
              <span>- $100</span>
            </div>
            <div className="flex justify-between text-lg font-medium mb-4">
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total Amount</span>
              <span>${totalAmount}</span>
            </div>
            <button className="w-full mt-4 py-2 bg-orange-500 text-white rounded-lg font-semibold">PLACE ORDER</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
