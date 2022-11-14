const express = require("express");
const { residentController } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(residentController.getAllResident)
  .post(residentController.addResident);

router
  .route("/:id")
  .get(residentController.getResident)
  .patch(residentController.updateResident)
  .delete(residentController.deleteResident);

module.exports = router;
