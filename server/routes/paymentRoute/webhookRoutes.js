const express = require("express");
const router = express.Router();
const webhookController = require("../../controllers/payment/webhookPage");

router.post("/payment/webhook", webhookController.handleWebhook);

module.exports = router;