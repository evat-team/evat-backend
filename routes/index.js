const dailyFormRouter = require("./medical-forms-routes/daily-form-router");
const redEvatRouter = require("./medical-forms-routes/redEvatRouter");

const recordRouter = require("./record-routes/recordRouter");

const patientRouter = require("./patient-routes/patientRouter");

const doctorRouter = require("./staff-routes/doctorRouter");
const nurseRouter = require("./staff-routes/nurseRouter");
const qaRouter = require("./staff-routes/qaRouter");
const residentRouter = require("./staff-routes/residentRouter");

const authRouter = require("./user-auth-routes/authRoutes");

module.exports = {
  dailyFormRouter,
  redEvatRouter,
  recordRouter,
  patientRouter,
  doctorRouter,
  nurseRouter,
  qaRouter,
  residentRouter,
  authRouter,
};
