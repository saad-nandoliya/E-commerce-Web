const crypto = require("crypto");
const axios = require("axios");
const db = require("../../connection/connection");
require("dotenv").config();

// Retry logic for API calls
const retry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = Buffer.from(JSON.stringify(req.body));

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature === expectedSignature) {
    console.log("✅ Webhook verified successfully");

    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    // Handle payment.captured and payment.failed events
    if (event === "payment.captured" || event === "payment.failed") {
      const { order_id, id: payment_id, amount } = payload;

      try {
        // Fetch user_id from orders table
        const orderCheck = await db.query(
          "SELECT user_id FROM orders WHERE order_id = $1",
          [order_id]
        );
        const user_id = orderCheck.rows[0]?.user_id || null;
        if (!user_id) {
          console.error("user_id not found for order_id:", order_id);
          return res.status(200).json({ status: "ok" });
        }

        // Razorpay API Call to confirm status
        const razorpayRes = await retry(() =>
          axios.get(`https://api.razorpay.com/v1/orders/${order_id}/payments`, {
            auth: {
              username: process.env.RAZORPAY_KEY_ID,
              password: process.env.RAZORPAY_SECRET,
            },
          })
        );

        const payment = razorpayRes.data.items && razorpayRes.data.items[0];
        if (!payment) {
          console.error("No payment found for order_id:", order_id);
          return res.status(200).json({ status: "ok" });
        }
        const payment_status = payment.status; // captured, failed, etc.

        // Set custom status based on payment_status
        const status = payment_status === "captured" ? "Completed" : "Failed";

        // Check if payment exists
        const check = await db.query(
          "SELECT * FROM payments WHERE transaction_id = $1",
          [payment_id]
        );

        if (check.rows.length === 0) {
          // Insert new payment record
          const insertQuery = `
            INSERT INTO payments (
              order_id, user_id, payment_status, transaction_id, amount, status
            ) VALUES ($1, $2, $3, $4, $5, $6)
          `;
          const values = [
            order_id,
            user_id,
            payment_status,
            payment_id,
            amount / 100,
            status,
          ];
          await db.query(insertQuery, values);
          console.log("💾 Payment saved to DB");
          console.log("🧾 Status:", status);
        } else {
          // Update existing payment record
          const updateQuery = `
            UPDATE payments
            SET payment_status = $1, status = $2, amount = $3
            WHERE transaction_id = $4
          `;
          const updateValues = [payment_status, status, amount / 100, payment_id];
          await db.query(updateQuery, updateValues);
          console.log("🔄 Payment updated in DB");
          console.log("🧾 Status:", status);
        }
      } catch (err) {
        console.error("Webhook Error:", err.message);
      }
    } else {
      console.log("ℹ️ Unhandled event:", event);
    }

    return res.status(200).json({ status: "ok" });
  } else {
    console.warn("❌ Webhook signature mismatch");
    return res.status(400).json({ error: "Invalid signature" });
  }
};

module.exports = { razorpayWebhook };