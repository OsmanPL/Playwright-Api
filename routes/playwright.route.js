const express = require("express")
const router = express.Router()
const stealthModeController = require("../controllers/stealthMode.controller")

router.post("/stealthMode", stealthModeController.stealthMode)
router.post("/stealthMode2CaptchaAmazon", stealthModeController.stealthMode2CaptchaAmazon)

module.exports = router