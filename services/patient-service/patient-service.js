const { PatientModel } = require("../../models");
const { NotFoundError } = require("../../errors");
const APIQuery = require("../../utils/api-query");

/**
 * @typedef  {Object} PatientObject
 * @property {String} name Name of the patient
 * @property {Number} age Age of the patient
 * @property {String} palliative Define if the user has a palliative state or not
 * @property {String} typeOfCancer Name of the type of cancer of the user
 * @property {String} services Name of the services that the patient uses
 * @property {mongoose.Types.ObjectId} [idNurse] Define the id of the nurse in charge of the patient
 */

/**
 * @class Provide several functios to interact with the patient collection
 * @description Handle the incoming requests for the patient collection in the DB
 */
class PatientService {
  /**
   *
   * @returns {Array<PatientObject>} Returns all the patients registered in the DB
   */
  async returnAllPatients() {
    const patients = await PatientModel.find();
    return patients;
  }

  /**
   *
   * @param {Object} query Types of data to search for patients with the same values
   * @example
   * const query = {name: "Roberto", sort="age", fields="name,age"}
   * QueryResult -> [{name: "Roberto", age: 10}, {name: "Roberto", age: 17}]
   * @returns {Array<PatientObject>} Return all the patients matched to the query
   */
  async returnFilteringPatients(query) {
    const queryFilter = PatientModel.find();

    const patients = await new APIQuery({ ...query }, queryFilter)
      .filter()
      .sort()
      .fields()
      .skip()
      .endFilter();

    return patients;
  }

  /**
   *
   * @param {String} idNurse Nurse ID
   * @returns {Array<PatientObject>} List of the patients matched to the nurse ID
   */
  async returnNursePatients(idNurse) {
    const results = await PatientModel.find({ idNurse });
    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Patient ID
   * @returns {PatientObject} Returns the patient found in the DB
   * @throws {NotFoundError} Throws an error if the patient was not found
   */
  async returnPatient(id) {
    const patient = await PatientModel.findById(id);

    if (!patient) {
      throw new NotFoundError("Patient was not found");
    }

    return patient;
  }

  /**
   *
   * @param {PatientObject} newUser
   * @returns {PatientObject} Returns the new patient registered in the DB
   * @throws Throws an error in case that one of the values provided is not valid
   */
  async createPatient(newUser) {
    const newPatient = await PatientModel.create({
      name: newUser.name,
      age: newUser.age,
      palliative: newUser.palliative,
      typeOfCancer: newUser.typeOfCancer,
      services: newUser.services,
    });

    return newPatient;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Patient ID
   * @param {Object} userInfo New values for the patient
   * @returns {PatientObject} Returns the patient updated
   * @throws {NotFoundError} Throws an error if the patient was not found
   */
  async updatePatientById(id, userInfo) {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        name: userInfo.name,
        age: userInfo.age,
        palliative: userInfo.palliative,
        typeOfCancer: userInfo.typeOfCancer,
        services: userInfo.services,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      throw new NotFoundError("Patient was not found");
    }

    return updatedPatient;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Patient ID
   * @returns {PatientObject} Patient without an Nurse ID
   * @description Deletes the current value for 'idNurse' in the patient document
   * @throws {NotFoundError} In case that the patient was not found
   */
  async deleteIdNurse(id) {
    const patient = await PatientModel.findByIdAndUpdate(
      id,
      { idNurse: null },
      { new: true }
    );

    if (!patient) {
      throw new NotFoundError("Patient was not found");
    }
    return patient;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Patient ID
   * @param {mongoose.Types.ObjectId} idNurse New value for 'idNurse' for the patient
   * @returns {PatientObject} Patient with the new Nurse ID
   * @description Set the current value for 'idNurse' in the patient document
   * @throws {NotFoundError} In case that the patient was not found
   */
  async setIdNurse(id, idNurse) {
    const patientUpdated = await PatientModel.findByIdAndUpdate(
      id,
      { idNurse },
      { new: true }
    );

    if (!patientUpdated) {
      throw new NotFoundError("Patient was not found");
    }

    return patientUpdated;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Patient ID
   * @returns {PatientObject} Returns the patient deleted in the DB
   * @throws {NotFoundError} Throws an error if the patient was not found
   */
  async deletePatientById(id) {
    const patientDeleted = await PatientModel.findByIdAndRemove(id);

    if (!patientDeleted) {
      throw new NotFoundError("Patient was not found");
    }

    return patientDeleted;
  }
}

module.exports = new PatientService();
