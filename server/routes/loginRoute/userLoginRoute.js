const express = require("express")
const router = express.Router()
const userLogin = require("../../controllers/Login/userLogin")


router.route("/register-new-user").post(userLogin.registerNewUser)
router.route("/login-user").post(userLogin.loginClientUser)
router.route("/google-signup").post(userLogin.googleSignup)



module.exports = router


