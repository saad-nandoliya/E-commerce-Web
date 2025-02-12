const express = require("express")
const router = express.Router()
const product = require("../../controllers/pages/productPage")



router.route("/get-all-products").get(product.getAllProduct)


module.exports = router;