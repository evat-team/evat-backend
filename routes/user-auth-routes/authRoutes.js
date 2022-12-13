const express = require("express");
const { userAuthController } = require("../../controllers");

const router = express.Router();

router.post("/", userAuthController.signIn);

module.exports = router;
