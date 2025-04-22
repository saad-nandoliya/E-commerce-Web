const crypto = require("crypto");
require("dotenv").config();

handleWebhook = async (req, res) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "your_webhook_secret";
    const receivedSignature = req.headers["x-razorpay-signature"];
    const payload = JSON.stringify(req.body);

    try {
        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(payload)
            .digest("hex");

        if (expectedSignature !== receivedSignature) {
            console.error("Invalid webhook signature");
            return res.status(400).json({ error: "Invalid signature" });
        }

        const event = req.body.event;
        const orderId = req.body.payload.payment.entity.order_id;

        if (event === "payment.captured") {
            console.log(`Webhook: Order ID ${orderId} - Success`);
        }

        res.status(200).json({ status: "ok" });
    } catch (err) {
        console.error("Error in webhook:", err);
        res.status(500).json({ error: "Webhook processing failed" });
    }
}; 

module.exports = {handleWebhook}