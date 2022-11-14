const express = require("express");
const { medicalResponseController } = require("./../../controllers");

const router = express.Router();

router
  .route("/")
  .get(medicalResponseController.getAllMedicalResponses)
  .post(medicalResponseController.addMedicalResponse);

router
  .route("/:id")
  .get(medicalResponseController.getMedicalResponse)
  .patch(medicalResponseController.updateMedicalResponse)
  .delete(medicalResponseController.deleteMedicalResponse);

module.exports = router;
