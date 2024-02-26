const express = require("express");
const router = express.Router();
const rotationBrowserMapper = require("../controllers/rotationBrowserMapper.controller");

router.post(
  "/browser",
  rotationBrowserMapper.rotationBrowserMapper
);

module.exports = router;