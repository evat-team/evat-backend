const dailyFormRouter = require("./medical-forms-routes/daily-form-router");
const redEvatRouter = require("./medical-forms-routes/redEvatRouter");

const recordRouter = require("./record-routes/recordRouter");
const notificationsRouter = require("./record-routes/notification-routes");

const patientRouter = require("./patient-routes/patientRouter");

const employeeRouter = require("./staff-routes/employeeRouter");

const authRouter = require("./user-auth-routes/authRoutes");

module.exports = {
  dailyFormRouter,
  redEvatRouter,
  recordRouter,
  patientRouter,
  authRouter,
  employeeRouter,
  notificationsRouter,
};
