const dailyFormController = require("./medical-forms-controllers/daily-form-controller");
const redEvatController = require("./medical-forms-controllers/redEvatController");

const patientController = require("./patient-controller/patientController");

const recordController = require("./record-controllers/recordController");

const employeeController = require("./staff-controllers/EmployeeController");

const userAuthController = require("./user-auth-controller/authController");

module.exports = {
  dailyFormController,
  redEvatController,
  patientController,
  recordController,
  userAuthController,
  employeeController,
};
