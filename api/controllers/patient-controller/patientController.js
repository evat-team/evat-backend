const { PatientService } = require("../../services");
const { StatusCodes } = require("http-status-codes");

// @ desc    Return all patients
// @ access  Private
// @ method  GET
const getAllPatients = async (req, res) => {
  const patients = await PatientService.returnAllPatients();

  res.status(StatusCodes.OK).json({
    result: patients,
    noResults: patients.length,
    success: "true",
  });
};

// @ desc    Return all patients matched to the query
// @ access  Private
// @ method  GET
const getFilteringPatients = async (req, res) => {
  const patients = await PatientService.returnFilteringPatients({
    ...req.query,
  });

  res.status(StatusCodes.OK).json({
    result: patients,
    results: patients.length,
    success: "true",
  });
};

// @ desc    Return patient by id
// @ access  Private
// @ method  GET
const getPatient = async (req, res) => {
  const { id } = req.params;

  const patient = await PatientService.returnPatient(id);

  res.status(StatusCodes.OK).json({
    result: patient,
    success: "true",
  });
};

// @ desc    Return all patients matched to a nurse
// @ access  Private
// @ method  GET
const getNursePatients = async (req, res) => {
  const { idNurse } = req.params;

  const patients = await PatientService.returnNursePatients(idNurse);

  res.status(StatusCodes.OK).json({
    result: patients,
    noResults: patients.length,
    success: "true",
  });
};

// @ desc    Create new patient
// @ access  Private
// @ method  POST
const addPatient = async (req, res) => {
  const newPatient = await PatientService.createPatient({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newPatient,
    success: "true",
  });
};

// @ desc    Update patient
// @ access  Private
// @ method  PATCH
const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patientUpdated = await PatientService.updatePatientById(id, {
    ...req.body,
  });

  res.status(StatusCodes.ACCEPTED).json({
    result: patientUpdated,
    success: "true",
  });
};

// @ desc    Remove the nurse id assigned to a patient
// @ access  Private
// @ method  PATCH
const deleteIdNurse = async (req, res) => {
  const { id } = req.params;

  const patientUpdated = await PatientService.deleteIdNurse(id);

  res.status(StatusCodes.ACCEPTED).json({
    result: patientUpdated,
    success: "true",
  });
};

// @ desc    Set the nurse id to a patient
// @ access  Private
// @ method  POST
const setIdNurse = async (req, res) => {
  const { id } = req.params;
  const { idNurse } = req.body;

  const patientUpdated = await PatientService.setIdNurse(id, idNurse);

  res.status(StatusCodes.ACCEPTED).json({
    result: patientUpdated,
    success: "true",
  });
};

// @ desc    Remove patient
// @ access  Private
// @ method  DELETE
const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patientDeleted = await PatientService.deletePatientById(id);

  res.status(StatusCodes.ACCEPTED).json({
    result: patientDeleted,
    success: "true",
  });
};

module.exports = {
  getAllPatients,
  getFilteringPatients,
  getPatient,
  addPatient,
  deletePatient,
  deleteIdNurse,
  updatePatient,
  getNursePatients,
  setIdNurse,
};
