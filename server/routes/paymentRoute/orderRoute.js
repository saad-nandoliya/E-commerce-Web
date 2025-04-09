const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/payment/orderPage");

router.route("/createOrder").post(orderController.createOrder);

module.exports = router;