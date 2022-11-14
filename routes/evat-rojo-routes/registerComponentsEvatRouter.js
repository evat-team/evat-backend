const express = require("express");
const { registerComponentController } = require("./../../controllers");

const router = express.Router();

router
  .route("/")
  .get(registerComponentController.getAllRegisterComponentEvat)
  .post(registerComponentController.addRegisterComponentEvat);

router
  .route("/:id")
  .get(registerComponentController.getRegisterComponentEvat)
  .patch(registerComponentController.updateRegisterComponentEvat)
  .delete(registerComponentController.deleteRegisterComponentEvat);

module.exports = router;
