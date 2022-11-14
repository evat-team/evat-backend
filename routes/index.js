const medicalResponseRouter = require("./evat-rojo-routes/medicalResponseRouter");
const redEvatRouter = require("./evat-rojo-routes/redEvatRouter");
const registerComponentsEvatRouter = require("./evat-rojo-routes/registerComponentsEvatRouter");
const trackingRouter = require("./evat-rojo-routes/trackingRouter");

const recordRouter = require("./record-routes/recordRouter");

const patientRouter = require("./patient-routes/patientRouter");

const doctorRouter = require("./staff-routes/doctorRouter");
const nurseRouter = require("./staff-routes/nurseRouter");
const qaRouter = require("./staff-routes/qaRouter");
const residentRouter = require("./staff-routes/residentRouter");

module.exports = {
  medicalResponseRouter,
  redEvatRouter,
  registerComponentsEvatRouter,
  trackingRouter,
  recordRouter,
  patientRouter,
  doctorRouter,
  nurseRouter,
  qaRouter,
  residentRouter,
};
