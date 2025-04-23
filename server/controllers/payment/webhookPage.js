const crypto = require("crypto");
const axios = require("axios");
const db = require("../../connection/connection");
require("dotenv").config();

const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature === expectedSignature) {
    console.log("✅ Webhook verified successfully");

    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    // Extract payment_id and check the payment status directly via transaction_id
    const { id: payment_id, amount } = payload;

    if (event === "payment.captured" || event === "payment.failed") {
      try {
        // 🔍 Razorpay API Call to get payment status using payment_id (transaction_id)
        const paymentRes = await axios.get(
          `https://api.razorpay.com/v1/payments/${payment_id}`,
          {
            auth: {
              username: process.env.RAZORPAY_KEY_ID,
              password: process.env.RAZORPAY_KEY_SECRET,
            },
          }
        );

        const payment = paymentRes.data;
        const method = payment.method; // upi, card, etc.
        const status = payment.status; // captured, failed, etc.

        // ✅ Check if this transaction_id already exists
        const check = await db.query(
          "SELECT * FROM payments WHERE transaction_id = $1",
          [payment_id]
        );

        if (check.rows.length === 0) {
          const insertQuery = `
            INSERT INTO payments (
              order_id,
              user_id,
              payment_method,
              payment_status,
              transaction_id,
              amount,
              status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          `;

          const values = [
            null, // No need for order_id if we're using payment_id
            null, // You can insert user_id here dynamically if you need
            method,
            status,
            payment_id,
            amount / 100, // Convert amount from paise to INR
            status === "captured" ? "Completed" : "Failed", // Handle captured or failed status
          ];

          await db.query(insertQuery, values);
          console.log("💾 Webhook: Payment saved to DB");
          console.log("🧾 Status:", status);
          console.log("💳 Method:", method);
        } else {
          console.log("⚠️ Webhook: Payment already exists");
        }
      } catch (err) {
        console.error("Webhook Razorpay/API Error:", err.message);
      }
    }

    res.status(200).json({ status: "ok" });
  } else {
    console.warn("❌ Webhook signature mismatch");
    res.status(400).json({ error: "Invalid signature" });
  }
};

module.exports = { razorpayWebhook };
