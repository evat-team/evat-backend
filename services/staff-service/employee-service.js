const { EmployeeModel } = require("../../models");
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
 *
 * @description Handle the incoming request to get or modify data in the Employee collection
 * @class Provide different function to comunicate with the Employee collection in the DB
 */
class EmployeeService {
  /**
   *
   * @returns {Array<EmployeeObject>} List of all employess in the DB
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
   * @returns {EmployeeObject} Employee found in the DB
   * @throws {NotFoundError} In case that the user was not found
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
   * @param {EmployeeObject} employee
   * @returns {EmployeeObject} Employee created in the DB
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
   * @param {Object} employee New values to the Employee document
   * @returns {EmployeeObject} Employee updated
   * @throws {NotFoundError} In case that the employee was not found
   */
  async updateEmployee(id, employee) {
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

    if (!employeeUpdated) {
      throw new NotFoundError("User was not found");
    }

    return employeeUpdated;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Employee ID
   * @param {String} newPassword New password for the employee
   * @returns {EmployeeObject} Employee with new password
   * @throws {NotFoundError} In case that the employee was not found
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
   * @returns {EmployeeObject} Employee deleted from the DB
   * @throws {NotFoundError} In case that the employee was not found
   */
  async deleteEmployee(id) {
    const employeeDeleted = await EmployeeModel.findByIdAndRemove(id);

    if (!employeeDeleted) {
      throw new NotFoundError("User was not found");
    }

    return employeeDeleted;
  }
}

module.exports = new EmployeeService();
