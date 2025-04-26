const crypto = require("crypto");
const axios = require("axios");
const db = require("../../connection/connection");
require("dotenv").config();

const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const data = JSON.parse(req.body);
  const event = data.event;
  const payload = data.payload.payment.entity;

  console.log("payload", payload)

  if (event !== "payment.captured" && event !== "payment.failed") {
    return res.status(200).json({ status: "unhandled event" });
  }

  const {
    order_id: payment_order_id,
    id: payment_id,
    amount,
    notes,
  } = payload;

  const order_id = notes?.order_id ? parseInt(notes.order_id) : null;
  const user_id = notes?.user_id ? parseInt(notes.user_id) : null;

  if (!order_id || !user_id) return res.status(200).json({ status: "ok" });

  try {
    const orderCheck = await db.query("SELECT id FROM orders WHERE id = $1", [order_id]);
    if (!orderCheck.rows.length) return res.status(200).json({ status: "order not found" });

    const razorpayRes = await axios.get(
      `https://api.razorpay.com/v1/orders/${payment_order_id}/payments`,
      {
        auth: {
          username: process.env.RAZORPAY_KEY_ID,
          password: process.env.RAZORPAY_KEY_SECRET,
        },
      }
    );

    const payment = razorpayRes.data.items[0];
    if (!payment) return res.status(200).json({ status: "no payment found" });

    const payment_method = payment.method;
    const payment_status = payment.status;
    const status = payment_status === "captured" ? "Completed" : "Failed";

    const existing = await db.query(
      "SELECT id FROM payments WHERE transaction_id = $1",
      [payment_id]
    );

    if (existing.rows.length) {
      await db.query(
        `UPDATE payments
         SET payment_method = $1, payment_status = $2, amount = $3, status = $4
         WHERE transaction_id = $5`,
        [payment_method, payment_status, amount / 100, status, payment_id]
      );
    } else {
      await db.query(
        `INSERT INTO payments (
           order_id, user_id, payment_order_id, payment_method, payment_status,
           transaction_id, amount, status
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [order_id, user_id, order_id, payment_method, payment_status, payment_id, amount / 100, status]
      );
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { razorpayWebhook };
