const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/payment/paymentPage");

router.route("/createPaymentOrder").post(paymentController.createPaymentOrder);
router.route("/verifyPayment").post(paymentController.verifyPayment);

module.exports = router;