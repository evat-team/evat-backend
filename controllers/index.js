const dailyFormController = require("./medical-forms-controllers/daily-form-controller");
const redEvatController = require("./medical-forms-controllers/redEvatController");

const patientController = require("./patient-controller/patientController");

const recordController = require("./record-controllers/recordController");

const doctorController = require("./staff-controllers/doctorController");
const nurseController = require("./staff-controllers/nurseController");
const qaController = require("./staff-controllers/qaController");
const residentController = require("./staff-controllers/residentController");

const userAuthController = require("./user-auth-controller/login");

module.exports = {
  dailyFormController,
  redEvatController,
  patientController,
  recordController,
  doctorController,
  nurseController,
  qaController,
  residentController,
  userAuthController,
};
