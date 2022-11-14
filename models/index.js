const MedicalResponseModel = require("./evat-rojo-models/medicalResponseModel");
const RedEvatModel = require("./evat-rojo-models/redEvatModel");
const RegisterComponentModel = require("./evat-rojo-models/registerComponentsEvatModel");
const TrackingModel = require("./evat-rojo-models/trackingModel");

const PatientModel = require("./patient-model/patientModel");

const RecordModel = require("./record-models/recordModel");

const DoctorModel = require("./staff-models/doctorModel");
const NurseModel = require("./staff-models/nurseModel");
const QaModel = require("./staff-models/qaModel");
const ResidentModel = require("./staff-models/residentModel");

module.exports = {
  MedicalResponseModel,
  RedEvatModel,
  RegisterComponentModel,
  TrackingModel,
  PatientModel,
  RecordModel,
  DoctorModel,
  NurseModel,
  QaModel,
  ResidentModel,
};
