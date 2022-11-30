const { patientService } = require("../../services");
const { StatusCodes } = require("http-status-codes");

const getAllPatients = async (req, res) => {
  const patients = await patientService.returnAllPatients();

  res.status(StatusCodes.OK).json({
    data: patients,
    noResults: patients.length,
    success: "true",
  });
};

const getPatient = async (req, res) => {
  const { id } = req.params;

  const patient = await patientService.returnPatient(id);

  res.status(StatusCodes.OK).json({
    result: patient,
    success: "true",
  });
};

const addPatient = async (req, res) => {
  const newPatient = await patientService.createPatient({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newPatient,
    success: "true",
  });
};

const updatePatient = async (req, res) => {
  const { id } = req.params;

  const updatedPatient = await patientService.updatePatientById(id, {
    ...req.body,
  });

  res.status(StatusCodes.OK).json({
    result: updatedPatient,
    success: "true",
  });
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patientDeleted = await patientService.deletePatientById(id);

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
