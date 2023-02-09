const {
  EmployeeModel,
  PatientModel,
  NotificationsModel,
} = require("../../models");
const { NotFoundError, BadRequestError } = require("../../errors");
const bcrypt = require("bcrypt");
const APIQuery = require("../../utils/api-query");

/**
 * @typedef {Object} EmployeeObject
 * @property {String} name
 * @property {String} email
 * @property {String} phone
 * @property {String} password
 * @property {String} role Value for role must be between [DOCTOR, NURSE, ADMIN, RESIDENT]
 * @property {String} [specialty] If the employee is a doctor you can specify an specialty
 */

/**
 * @class Provide different function to interact with the Employee collection
 */
class EmployeeService {
  /**
   *
   * @returns {Array<EmployeeObject>} All employess.
   */
  async returnAllEmployees() {
    const results = await EmployeeModel.find();
    return results;
  }

  /**
   *
   * @param {Object} query Types of data to search for employees with the same values
   * @example
   * const query = {role: "NURSE", fields="name,role"}
   * QueryResult -> [{name: "Maria", role: "NURSE"}, {name: "SARA", role: "NURSE"}]
   * @returns {Array<EmployeeObject>} Return all the employees matched to the query
   */
  async returnFilteringResults(query) {
    const queryFilter = EmployeeModel.find();

    const results = await new APIQuery(query, queryFilter)
      .filter()
      .sort()
      .skip()
      .fields()
      .endFilter();

    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Employee ID
   * @returns {EmployeeObject} Employee found.
   * @throws {NotFoundError} In case User was not found
   */
  async returnSingleEmployee(id) {
    const result = await EmployeeModel.findById(id);

    if (!result) {
      throw new NotFoundError("User was not found");
    }

    return result;
  }

  /**
   *
   * @returns {EmployeeObject} Employees with doctor and resident role found.
   */
  async returnDoctorAndResidents() {
    const result = await EmployeeModel.find({
      $or: [{ role: "DOCTOR" }, { role: "RESIDENT" }],
    });

    return result;
  }

  /**
   *
   * @param {Array<EmployeeObject>} employee
   * @returns {EmployeeObject} Employee created.
   */
  async createEmployee(employee) {
    const newEmployee = await EmployeeModel.create({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      password: employee.password,
      role: employee.role,
      specialty: employee.specialty,
    });

    return newEmployee;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Employee ID
   * @param {Object} employee New values for the Employee.
   * @returns {EmployeeObject} Employee updated
   * @throws {NotFoundError} In case Employee was not found
   */
  async updateEmployee(id, employee) {
    const emp = await this.returnSingleEmployee(id);

    if (emp.role === "NURSE" && employee.role !== "NURSE") {
      await this._checkNurseHasPatients(id);
    }

    if (emp.role !== "DOCTOR" && emp.role !== "RESIDENT") {
      delete employee.specialty;
    }

    const employeeUpdated = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
        specialty: employee.specialty,
      },
      { new: true, runValidators: true }
    );

    return employeeUpdated;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Employee ID
   * @param {String} newPassword New password for the employee
   * @returns {EmployeeObject} Employee with new password
   * @throws {NotFoundError} In case Employee was not found
   */
  async changePassword(id, newPassword) {
    if (!newPassword)
      throw new BadRequestError("Please provide a new password");

    if (newPassword.length < 6)
      throw new BadRequestError("Password must contain at least 6 characters");

    if (newPassword.length > 128)
      throw new BadRequestError("Password is too long");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const employeeUpdated = await EmployeeModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!employeeUpdated) {
      throw new NotFoundError("User was not found");
    }

    return employeeUpdated;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Employee ID
   * @returns {EmployeeObject} Employee deleted
   * @throws {NotFoundError} In case Employee was not found
   */
  async deleteEmployee(id) {
    const employee = await this.returnSingleEmployee(id);

    if (employee.role === "NURSE") {
      await this._checkNurseHasPatients(id);
    }

    if (employee.role === "DOCTOR" || employee.role === "RESIDENT") {
      await this._deleteDoctorNotifications(id);
    }

    await EmployeeModel.findByIdAndRemove(id);

    return employee;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idNurse Nurse ID
   * @desc Checks if the nurse still has patients
   */
  async _checkNurseHasPatients(idNurse) {
    const patients = await PatientModel.find({ idNurse });

    if (patients.length > 0) {
      throw new BadRequestError(
        "You can't perform this action due this nurse still has patients assigned"
      );
    }

    await NotificationsModel.deleteMany({ idTransmitter: idNurse });
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idDoctor Doctor ID
   * @desc Checks if doctor or resident still has notifications and delete them
   */
  async _deleteDoctorNotifications(idDoctor) {
    await NotificationsModel.deleteMany({ idDoctor });
  }
}

module.exports = new EmployeeService();
