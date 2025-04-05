const express = require("express")
const router = express.Router()
const userLogin = require("../../controllers/Login/userLogin")



router.route("/send-otp").post(userLogin.sendOtp)
router.route("/register-new-user").post(userLogin.registerNewUser)
router.route("/login-user").post(userLogin.loginClientUser)



module.exports = router


