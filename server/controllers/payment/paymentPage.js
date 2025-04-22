const db = require("../../connection/connection");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order
const createPaymentOrder = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

// Verify payment and place order
const verifyPayment = async (req, res) => {
  const {
    order_id,
    user_id,
    payment_method,
    payment_id,
    signature,
    amount,
    cartItems,
    shipping,
  } = req.body;

  if (!user_id || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    let verified = false;

    if (payment_method === "cod") {
      verified = true;
    } else {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(`${order_id}|${payment_id}`)
        .digest("hex");

      verified = expectedSignature === signature;
    }

    if (!verified) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    // Store order
    const orderResult = await db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING id",
      [user_id, amount]
    );
    const orderId = orderResult.rows[0].id;

    // Insert items
    for (const item of cartItems) {
      if (!item.product_id || !item.quantity || !item.price) continue;

      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // Shipping
    await db.query(
      "INSERT INTO shipping_addresses (user_id, order_id, address, city, state, country, zip_code, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        user_id,
        orderId,
        shipping.address,
        shipping.city,
        shipping.state,
        shipping.country,
        shipping.zip_code,
        shipping.phone_number,
      ]
    );

    // Payment
    await db.query(
      "INSERT INTO payment (order_id, user_id, payment_method, payment_status, transaction_id, amount) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        orderId,
        user_id,
        payment_method,
        payment_method === "cod" ? "Pending" : "Completed",
        payment_id || null,
        amount,
      ]
    );

    res.status(200).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ error: "Failed to process order" });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
