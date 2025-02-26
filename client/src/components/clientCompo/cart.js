import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
const Cart = () => {
  const { cart, totalAmount, increaseQty, decreaseQty, removeItem } = useCart();
  return (
    <div className="min-h-screen container mx-auto flex flex-col items-center py-5">
      <h1 className="text-2xl font-semibold text-center mb-4">Your Cart</h1>

      {/* Cart Items */}
      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item.id}
            className="w-full max-w-lg bg-white p-4 rounded-lg shadow mb-4 flex items-center gap-4"
          >
            {/* Product Image */}
            <img
              src={`/uploads/productImage/${item.image}`}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
            />

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-lg font-medium">{item.name}</span>
                <span className="text-lg font-semibold">
                  ${item.price * item.quantity}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    className="text-white bg-gray-800 rounded p-2"
                    onClick={() => decreaseQty(item.id)}
                  >
                    <i className="fa-solid fa-minus text-xs"></i>
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="text-white bg-gray-800 rounded p-2"
                    onClick={() => increaseQty(item.id)}
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
                <button
                  className="text-red-500 text-lg"
                  onClick={() => removeItem(item.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}

      {/* Total & Checkout */}
      {cart.length > 0 && (
        <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-semibold">${totalAmount}</span>
          </div>
        </div>
      )}

      {/* Checkout & Place Order Buttons */}
      {cart.length > 0 && (
        <div className="w-full max-w-lg mt-4">
          <Link to="/checkout">
            <button className="w-full px-6 py-2 bg-black text-white rounded-lg">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
