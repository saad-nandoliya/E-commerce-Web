const express = require("express")
const router = express.Router()
const adminUserRoute = require("../../controllers/Login/adminLogin")


router.route("/add-admin-user").post(adminUserRoute.addAdminUser)
router.route("/login-admin-user").post(adminUserRoute.loginAdminUser)
router.route("/get-admin-user").get(adminUserRoute.getAdminUsers)
router.route("/delete-admin-user/:id").delete(adminUserRoute.deleteAdminUser)


module.exports = router