const express = require("express");
const router = express.Router();
const PaymentController = require("../../controllers/payment/paymentPage");

router.post('/checkout', PaymentController.checkout);
router.post('/payment-verification', PaymentController.paymentVerification);

module.exports = router;