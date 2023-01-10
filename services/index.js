const DailyFormService = require("./medical-form-service/daily-form-service");
const RedEvatService = require("./medical-form-service/red-evat-services");

const RecordService = require("./record-service/record-service");
const NotificationService = require("./record-service/notifications-service");

const PatientService = require("./patient-service/patient-service");

const EmployeeService = require("./staff-service/employee-service");

const AuthService = require("./user-auth-service/auth-services");

module.exports = {
  PatientService,
  AuthService,
  RecordService,
  DailyFormService,
  RedEvatService,
  EmployeeService,
  NotificationService,
};
