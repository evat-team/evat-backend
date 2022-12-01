const dailyFormService = require("./medical-form-service/daily-form-service");
const redEvatService = require("./medical-form-service/red-evat-services");

const recordService = require("./record-service/record-service");

const patientService = require("./patient-service/patient-service");

const doctorService = require("./staff-service/doctor-service");
const nurseService = require("./staff-service/nurse-service");
const residentService = require("./staff-service/resident-service");
const qaService = require("./staff-service/qa-service");

const authService = require("./user-auth-service/auth-services");

module.exports = {
  patientService,
  doctorService,
  nurseService,
  residentService,
  qaService,
  authService,
  recordService,
  dailyFormService,
  redEvatService,
};
