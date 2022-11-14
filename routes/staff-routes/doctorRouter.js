const express = require("express");
const { doctorController } = require("../../controllers");

const doctorRouter = express.Router();

doctorRouter
  .route("/")
  .get(doctorController.getAllDoctors)
  .post(doctorController.addDoctor);

doctorRouter
  .route("/:id")
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

module.exports = doctorRouter;
