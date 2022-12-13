const { PatientService } = require("../../services");
const { StatusCodes } = require("http-status-codes");

const getAllPatients = async (req, res) => {
  const patients = await PatientService.returnAllPatients();

  res.status(StatusCodes.OK).json({
    data: patients,
    noResults: patients.length,
    success: "true",
  });
};

const getPatient = async (req, res) => {
  const { id } = req.params;

  const patient = await PatientService.returnPatient(id);

  res.status(StatusCodes.OK).json({
    result: patient,
    success: "true",
  });
};

const addPatient = async (req, res) => {
  const newPatient = await PatientService.createPatient({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newPatient,
    success: "true",
  });
};

const updatePatient = async (req, res) => {
  const { id } = req.params;

  const updatedPatient = await PatientService.updatePatientById(id, {
    ...req.body,
  });

  res.status(StatusCodes.OK).json({
    result: updatedPatient,
    success: "true",
  });
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patientDeleted = await PatientService.deletePatientById(id);

  res.status(StatusCodes.OK).json({
    result: patientDeleted,
    success: "true",
  });
};

module.exports = {
  getAllPatients,
  getPatient,
  addPatient,
  deletePatient,
  updatePatient,
};
