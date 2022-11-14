const medicalResponseController = require("./evat-rojo-controllers/medicalResponseController");
const redEvatController = require("./evat-rojo-controllers/redEvatController");
const registerComponentController = require("./evat-rojo-controllers/registerComponentsEvatController");
const trackingController = require("./evat-rojo-controllers/trackingController");

const patientController = require("./patient-controller/patientController");

const recordController = require("./record-controllers/recordController");

const doctorController = require("./staff-controllers/doctorController");
const nurseController = require("./staff-controllers/nurseController");
const qaController = require("./staff-controllers/qaController");
const residentController = require("./staff-controllers/residentController");

module.exports = {
  medicalResponseController,
  redEvatController,
  registerComponentController,
  trackingController,
  patientController,
  recordController,
  doctorController,
  nurseController,
  qaController,
  residentController,
};
