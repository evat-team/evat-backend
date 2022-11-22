const express = require("express");
const { patientController } = require("./../../controllers");


const patientRouter = express.Router();

patientRouter
  .route("/")
  .get(patientController.getAllPatients)
  .post(patientController.addPatient);

patientRouter
  .route("/:id")
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);

module.exports = patientRouter;
