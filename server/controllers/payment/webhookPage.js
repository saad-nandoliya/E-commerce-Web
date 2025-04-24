const crypto = require("crypto");
const pool = require("../../connection/connection"); // PostgreSQL DB connection pool
require("dotenv").config();

const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    console.log("Invalid signature ❌");
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const event = req.body.event;

  if (event === "payment.captured") {
    const payload = req.body.payload.payment.entity;

    const {
      order_id,
      id: payment_id,
      amount,
      method,
      status,
      notes,
    } = payload;

    const razorpayOrderId = order_id;
    const user_id = notes?.user_id || null;

    try {
      // Check if already exists
      const check = await pool.query(
        "SELECT * FROM payments WHERE transaction_id = $1",
        [payment_id]
      );

      if (check.rows.length === 0) {
        const insertQuery = `
          INSERT INTO payments (
            order_id,
            user_id,
            payment_order_id,
            payment_method,
            payment_status,
            transaction_id,
            amount,
            status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        const values = [
          order_id,
          user_id,
          razorpayOrderId,
          method,
          status,
          payment_id,
          amount / 100,
          "Completed",
        ];

        await pool.query(insertQuery, values);

        console.log("✅ Payment inserted successfully:", order_id);
        return res.status(200).json({ success: true, message: "Payment recorded" });
      } else {
        console.log("⚠️ Payment already exists:", payment_id);
        return res.status(200).json({ success: true, message: "Payment already exists" });
      }
    } catch (err) {
      console.error("❌ Error inserting payment:", err.message);
      return res.status(500).json({ success: false, message: "Database error" });
    }
  } else {
    return res.status(200).json({ success: true, message: "Event ignored" });
  }
};

module.exports = razorpayWebhook;
