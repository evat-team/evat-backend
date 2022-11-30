const patientService = require("./patient-service/patient-service");

const doctorService = require("./staff-service/doctor-service");
const nurseService = require("./staff-service/nurse-service");

module.exports = {
  patientService,
  doctorService,
  nurseService,
};
