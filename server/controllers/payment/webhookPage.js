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
  console.log("Webhook received:", req.body);

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = req.body; // Buffer (because express.raw())

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  console.log("Received Signature:", signature);
  console.log("Expected Signature:", expectedSignature);

  if (signature !== expectedSignature) {
    console.log("❌ Webhook signature mismatch");
    return res.status(400).json({ error: "Invalid signature" });
  }

  console.log("✅ Webhook verified successfully");

  const data = JSON.parse(body);
  const event = data.event;
  const payload = data.payload.payment.entity;

  if (event === "payment.captured" || event === "payment.failed") {
    const {
      order_id: payment_order_id,
      id: payment_id,
      amount,
      notes,
    } = payload;

    try {
      const order_id = notes?.order_id ? parseInt(notes.order_id) : null;
      const user_id = notes?.user_id ? parseInt(notes.user_id) : null;

      if (!order_id || !user_id) {
        console.log(`Missing notes: order_id=${order_id}, user_id=${user_id}`);
        return res.status(200).json({ status: "ok" });
      }

      const orderCheck = await db.query(
        "SELECT user_id FROM orders WHERE id = $1",
        [order_id]
      );

      if (!orderCheck.rows.length) {
        console.log("Order not found for order_id:", order_id);
        return res.status(200).json({ status: "ok" });
      }

      const razorpayRes = await retry(() =>
        axios.get(`https://api.razorpay.com/v1/orders/${payment_order_id}/payments`, {
          auth: {
            username: process.env.RAZORPAY_KEY_ID,
            password: process.env.RAZORPAY_KEY_SECRET,
          },
        })
      );
      console.log("Razorpay API Response:", razorpayRes.data);

      const payment = razorpayRes.data.items && razorpayRes.data.items[0];
      if (!payment) {
        console.log("No payment found for payment_order_id:", payment_order_id);
        return res.status(200).json({ status: "ok" });
      }

      const payment_method = payment.method;
      const payment_status = payment.status;
      const status = payment_status === "captured" ? "Completed" : "Failed";

      const check = await db.query(
        "SELECT * FROM payments WHERE transaction_id = $1",
        [payment_id]
      );
      console.log("DB Check Result:", check.rows);

      if (check.rows.length === 0) {
        const insertQuery = `
          INSERT INTO payments (
            order_id, user_id, payment_order_id, payment_method, payment_status,
            transaction_id, amount, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        const values = [
          order_id,
          user_id,
          order_id,
          payment_method,
          payment_status,
          payment_id,
          amount / 100,
          status,
        ];
        await db.query(insertQuery, values);
        console.log("💾 Payment saved to DB");
      } else {
        const updateQuery = `
          UPDATE payments
          SET payment_method = $1, payment_status = $2, amount = $3, status = $4
          WHERE transaction_id = $5
        `;
        const updateValues = [
          payment_method,
          payment_status,
          amount / 100,
          status,
          payment_id,
        ];
        await db.query(updateQuery, updateValues);
        console.log("🔄 Payment updated in DB");
      }

      console.log("🧾 Status:", status);
      console.log("💳 Method:", payment_method);
      console.log("🆔 Payment ID:", payment_id);
      console.log("🆔 Payment Order ID:", order_id);
    } catch (err) {
      console.error("Webhook Error:", err.message, "\nStack:", err.stack);
    }
  } else {
    console.log("ℹ️ Unhandled event:", event);
  }

  return res.status(200).json({ status: "ok" });
};

module.exports = { razorpayWebhook };
