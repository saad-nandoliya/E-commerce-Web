const crypto = require("crypto");
const axios = require("axios");
const db = require("../../connection/connection");

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

    if (event === "payment.captured") {
      const {
        order_id,
        id: payment_id,
        amount,
      } = payload;

      try {
        // 🔍 Razorpay API Call to confirm status + method
        const razorpayRes = await axios.get(
          `https://api.razorpay.com/v1/orders/${order_id}/payments`,
          {
            auth: {
              username: process.env.RAZORPAY_KEY_ID,
              password: process.env.RAZORPAY_SECRET,
            },
          }
        );

        const payment = razorpayRes.data.items[0];
        const method = payment.method; // upi, card, etc.
        const status = payment.status; // captured, failed etc.
        const user_contact = payment.contact;

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
            order_id || null,
            null,
            method || "razorpay",
            status || "captured",
            payment_id,
            amount / 100,
            "Completed",
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
