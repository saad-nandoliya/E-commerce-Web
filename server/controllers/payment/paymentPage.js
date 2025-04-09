const db = require("../../connection/connection");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config()


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order
const createPaymentOrder = async (req, res) => {
    const { amount } = req.body;

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

// Verify payment and save order
const verifyPayment = async (req, res) => {
    const { order_id, user_id, payment_method, payment_id, signature, amount, cartItems, shipping } = req.body;
console.log(req.body)
    try {
        let verified = false;

        if (payment_method === "cod") {
            verified = true;
        } else {
            const expectedSignature = crypto
                .createHmac("sha256", "YOUR_SECRET")
                .update(`${order_id}|${payment_id}`)
                .digest("hex");

            if (expectedSignature === signature) {
                verified = true;
            }
        }

        if (!verified) return res.status(400).json({ error: "Payment verification failed" });

        // Create order
        const [orderResult] = await db.query(
            "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
            [user_id, amount]
        );
        const orderId = orderResult.insertId;

        // Insert order items
        for (let item of cartItems) {
            await db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        // Insert shipping
        await db.query(
            "INSERT INTO shipping (user_id, address, city, state, country, zip_code, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                user_id,
                shipping.address,
                shipping.city,
                shipping.state,
                shipping.country,
                shipping.zip_code,
                shipping.phone_number,
            ]
        );

        // Insert payment
        await db.query(
            "INSERT INTO payment (order_id, user_id, payment_method, payment_status, transaction_id, amount) VALUES (?, ?, ?, ?, ?, ?)",
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

module.exports = { createPaymentOrder, verifyPayment };
