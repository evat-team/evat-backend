const { PatientModel } = require("../../models");
const { NotFoundError } = require("../../errors");

const returnAllPatients = async () => {
  const patients = await PatientModel.find();
  return patients;
};

const returnPatient = async (id) => {
  const patient = await PatientModel.findById(id);

  if (!patient) {
    throw new NotFoundError("Patient was not found");
  }

  return patient;
};

const createPatient = async (newUser) => {
  const newPatient = await PatientModel.create({ ...newUser });
  return newPatient;
};

const updatePatientById = async (id, userInfo) => {
  const updatedPatient = await PatientModel.findByIdAndUpdate(
    id,
    { ...userInfo },
    { new: true, runValidators: true }
  );

  if (!updatedPatient) {
    throw new NotFoundError("Patient was not found");
  }

  return updatedPatient;
};

const deletePatientById = async (id) => {
  const patientDeleted = await PatientModel.findByIdAndRemove(id);

  if (!patientDeleted) {
    throw new NotFoundError("Patient was not found");
  }

  return patientDeleted;
};

module.exports = {
  returnAllPatients,
  returnPatient,
  createPatient,
  updatePatientById,
  deletePatientById,
};
