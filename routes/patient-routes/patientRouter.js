const express = require("express");
const { patientController } = require("./../../controllers");

const patientRouter = express.Router();

patientRouter.route("/filter").get(patientController.getFilteringPatients);

patientRouter
  .route("/nurse-patients/:idNurse")
  .get(patientController.getNursePatients);

patientRouter
  .route("/asign-nurse/:id")
  .post(patientController.setIdNurse)
  .patch(patientController.deleteIdNurse);

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
