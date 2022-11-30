const DailyFormModel = require("./medical-forms-models/daily-form-model");
const RedEvatModel = require("./medical-forms-models/redEvatModel");

const PatientModel = require("./patient-model/patientModel");

const RecordModel = require("./record-models/recordModel");

const DoctorModel = require("./staff-models/doctorModel");
const NurseModel = require("./staff-models/nurseModel");
const QaModel = require("./staff-models/qaModel");
const ResidentModel = require("./staff-models/residentModel");

module.exports = {
  DailyFormModel,
  RedEvatModel,
  PatientModel,
  RecordModel,
  DoctorModel,
  NurseModel,
  QaModel,
  ResidentModel,
};
