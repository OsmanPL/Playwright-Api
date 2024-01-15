const express = require("express");
const router = express.Router();
const stealthModeController = require("../controllers/stealthMode.controller");
const stealthMode2CaptchaController = require("../controllers/mappers/stealthMode2Captcha.controller");

router.post(
  "/stealthModeRotationBrowsers",
  stealthModeController.stealthModeRotationBrowsers
);
router.post(
  "/stealthMode2CaptchaAmazon",
  stealthMode2CaptchaController.stealthMode2CaptchaAmazon
);

module.exports = router;