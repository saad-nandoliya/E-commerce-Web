const express = require("express");
const router = express.Router();
const shippingController = require("../../controllers/payment/shippingPage");

router.route("/saveShipping").post(shippingController.saveShipping);

module.exports = router;