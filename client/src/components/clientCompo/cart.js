import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Nike Shoes",
      price: 50,
      quantity: 1,
      image: "https://www.reliancedigital.in/medias/Apple-Watch-Series-494423143-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wyNjAwOXxpbWFnZS9qcGVnfGltYWdlcy9oMzcvaDcxLzEwMTk0ODkyMjU5MzU4LmpwZ3wwNGIzYTFlYzE4NmIyNjJmODMxYjE5ZTUxODc3ZmE1MTQzNDMzODQyYzliZmVlMjAwM2RmMTg0MTEwYmU0M2U4", // Sample Image
    },
    {
      id: 2,
      name: "Adidas T-shirt",
      price: 30,
      quantity: 1,
      image: "https://www.reliancedigital.in/medias/Apple-Watch-Series-494423143-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wyNjAwOXxpbWFnZS9qcGVnfGltYWdlcy9oMzcvaDcxLzEwMTk0ODkyMjU5MzU4LmpwZ3wwNGIzYTFlYzE4NmIyNjJmODMxYjE5ZTUxODc3ZmE1MTQzNDMzODQyYzliZmVlMjAwM2RmMTg0MTEwYmU0M2U4",
    },
    {
      id: 3,
      name: "Apple Watch",
      price: 120,
      quantity: 1,
      image: "https://www.reliancedigital.in/medias/Apple-Watch-Series-494423143-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wyNjAwOXxpbWFnZS9qcGVnfGltYWdlcy9oMzcvaDcxLzEwMTk0ODkyMjU5MzU4LmpwZ3wwNGIzYTFlYzE4NmIyNjJmODMxYjE5ZTUxODc3ZmE1MTQzNDMzODQyYzliZmVlMjAwM2RmMTg0MTEwYmU0M2U4",
    },
  ]);

  // Increase Quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate Total
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className=" container mx-auto flex flex-wrap flex-col items-center py-5  ">
      <h1 className="text-2xl font-semibold text-center mb-4">Your Cart</h1>

      {/* Cart Items */}
      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item.id}
            className="w-full  max-w-lg bg-white p-4 rounded-lg shadow mb-4 flex items-center gap-4"
          >
            {/* Product Image */}
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-lg font-medium">{item.name}</span>
                <span className="text-lg font-semibold">${item.price * item.quantity}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => decreaseQty(item.id)}>
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => increaseQty(item.id)}>
                    +
                  </button>
                </div>
                <button className="text-red-500 text-sm" onClick={() => removeItem(item.id)}>
                  Remove
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

export default Cart;
