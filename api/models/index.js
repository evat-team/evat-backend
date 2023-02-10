const DailyFormModel = require("./daily-form-model/daily-form-model");
const RedEvatModel = require("./medical-forms-models/redEvatModel");

const PatientModel = require("./patient-model/patientModel");

const RecordModel = require("./record-models/recordModel");
const NotificationsModel = require("./notification-model/notifications-model");

const EmployeeModel = require("./staff-models/employeeSchema");

module.exports = {
  DailyFormModel,
  RedEvatModel,
  PatientModel,
  RecordModel,
  EmployeeModel,
  NotificationsModel,
};
