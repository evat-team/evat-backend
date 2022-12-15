const { PatientModel } = require("../../models");
const { NotFoundError } = require("../../errors");

class PatientService {
  async returnAllPatients() {
    const patients = await PatientModel.find();
    return patients;
  }

  async returnPatient(id) {
    const patient = await PatientModel.findById(id);

    if (!patient) {
      throw new NotFoundError("Patient was not found");
    }

    return patient;
  }

  async createPatient(newUser) {
    const newPatient = await PatientModel.create({ ...newUser });
    return newPatient;
  }

  async updatePatientById(id, userInfo) {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      { ...userInfo },
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      throw new NotFoundError("Patient was not found");
    }

    return updatedPatient;
  }

  async deletePatientById(id) {
    const patientDeleted = await PatientModel.findByIdAndRemove(id);

    if (!patientDeleted) {
      throw new NotFoundError("Patient was not found");
    }

    return patientDeleted;
  }
}

module.exports = new PatientService();
