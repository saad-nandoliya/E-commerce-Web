const db = require("../../connection/connection");

createOrder = async (req, res) => {
    const { user_id, total_amount, cartItems } = req.body;

    try {
        // Create Order
        const [orderResult] = await db.query(
            "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
            [user_id, total_amount]
        );
        const orderId = orderResult.insertId;

        // Add Order Items
        for (let item of cartItems) {
            await db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        res.status(201).json({ message: "Order created", orderId });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};
 

module.exports = { createOrder }


