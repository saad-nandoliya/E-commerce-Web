const express = require("express");
const Category = require("../../controllers/pages/categoryPage");
const {categoryLocation} = require("../../middlewares/fileHandler");

const router = express.Router();

router.get("/category", Category.getCategories);
router.get("/getcategorybyid/:id", Category.getCategoryById);
router.delete("/deletecategory/:id", Category.deleteCategory);
router.post("/addcategory", categoryLocation.single("image"), Category.addCategory);
router.put("/updatecategory/:id", categoryLocation.single("image"), Category.updateCategory);

module.exports = router;