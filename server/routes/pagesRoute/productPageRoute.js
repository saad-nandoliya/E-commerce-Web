const express = require("express");
const products = require("../../controllers/pages/productPage");
const {productLocation} = require("../../middlewares/fileHandler");

const router = express.Router();

router.get("/getallproducts", products.getAllProducts);
router.get("/getproductsbyid/:id", products.getProductsById);
router.post("/addproducts", productLocation.single("image"), products.addProducts);
router.put(
  "/updateproducts/:id",
  productLocation.single("image"),
  products.updateProducts
);
router.delete("/deleteproducts/:id", products.deleteProducts);
router.get(
  "/getproductsbycategory/:id",
  products.getProductsByCategory
);

module.exports = router;