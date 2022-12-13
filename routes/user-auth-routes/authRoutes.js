const express = require("express");
const { userAuthController } = require("../../controllers");

const router = express.Router();

router.post("/", userAuthController.sign_in);

module.exports = router;
