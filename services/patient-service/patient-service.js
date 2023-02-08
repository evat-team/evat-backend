const {
  PatientModel,
  EmployeeModel,
  DailyFormModel,
  NotificationsModel,
} = require("../../models");
const { NotFoundError, BadRequestError } = require("../../errors");
const APIQuery = require("../../utils/api-query");

/**
 * @typedef  {Object} PatientObject
 * @property {String} name Name of the patient
 * @property {Number} age Age of the patient
 * @property {String} palliative Define if the user has a palliative state or not
 * @property {String} typeOfCancer Name of the type of cancer of the user
 * @property {String} services Name of the services that the patient uses
 * @property {mongoose.Types.ObjectId} [idNurse] Id of the nurse in charge of the patient
 */

/**
 * @class Provide several functios to interact with the patient collection
 */
class PatientService {
  /**
   *
   * @returns {Array<PatientObject>} Returns all patients
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
   * @returns {Array<PatientObject>} Patients matched to the nurse ID
   */
  async returnNursePatients(idNurse) {
    if (!idNurse) {
      throw new BadRequestError("Please provide a Nurse id");
    }

    const nurse = await EmployeeModel.findById(idNurse);

    if (!nurse) {
      throw new NotFoundError("Nurse was not found");
    }

    const results = await PatientModel.find({ idNurse });

    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Patient ID
   * @returns {PatientObject} Returns the patient found
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
   * @returns {PatientObject} New patient created
   */
  async createPatient(newUser) {
    const newPatient = await PatientModel.create({
      name: newUser.name,
      birthDateIso: newUser.birthDateIso,
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
        birthDateIso: userInfo.birthDateIso,
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
   * @description Deletes the current value for 'idNurse' of the patient
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
   * @param {mongoose.Types.ObjectId} idNurse Nurse ID
   * @returns {PatientObject} Patient updated
   * @description Set the current value for 'idNurse' of the patient
   * @throws {NotFoundError | BadRequestError}
   */
  async setIdNurse(id, idNurse) {
    const patients = await this.returnNursePatients(idNurse);

    const employee = await EmployeeModel.findById(idNurse);

    if (employee.role !== "NURSE") {
      throw new BadRequestError(
        "The Employee you're trying to set is not a nurse"
      );
    }

    if (patients.length >= parseInt(process.env.MAX_PATIENTS_FOR_NURSE)) {
      throw new BadRequestError("This nurse can only have 6 patients or less");
    }

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
   * @returns {PatientObject} Returns the patient deleted
   * @throws {NotFoundError} Error if the patient was not found
   */
  async deletePatientById(id) {
    // Confirms if the patient exists
    await this.returnPatient(id);

    // Delete all forms created for this patient
    await DailyFormModel.deleteMany({ idPatient: id });

    // Delete all notifications created for this patient
    await NotificationsModel.deleteMany({ idPatient: id });

    // Delete the patient
    await PatientModel.findByIdAndRemove(id);

    return patientDeleted;
  }
}

module.exports = new PatientService();
