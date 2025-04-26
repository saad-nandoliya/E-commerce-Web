const express = require("express");
const router = express.Router();
const { razorpayWebhook } = require("../../controllers/payment/webhookPage");

router.post("/payment/webhook", express.raw({ type: "*/*"  }), razorpayWebhook);

module.exports = router;