const { EmployeeModel } = require("../../models");
const { NotFoundError, BadRequestError } = require("../../errors");
const bcrypt = require("bcrypt");
const APIQuery = require("../../utils/api-query");

class EmployeeService {
  async returnAllEmployees() {
    const results = await EmployeeModel.find();
    return results;
  }

  async returnFilteringResults(query) {
    const queryFilter = EmployeeModel.find();

    const results = await new APIQuery(query, queryFilter)
      .filter()
      .sort()
      .skip()
      .fields("name", "email", "role", "phone")
      .endFilter();

    return results;
  }

  async returnSingleEmployee(id) {
    const result = await EmployeeModel.findById(id);

    if (!result) {
      throw new NotFoundError("User was not found");
    }

    return result;
  }

  async createEmployee(employee) {
    const newEmployee = await EmployeeModel.create({ ...employee });
    return newEmployee;
  }

  async updateEmployee(id, employee) {
    let { password } = employee;
    let newPass = password;

    if (password) {
      if (password.length < 6 || password.length > 128) {
        throw new BadRequestError("Please provide a correct password");
      }

      const salt = await bcrypt.genSalt(10);
      newPass = await bcrypt.hash(password, salt);

      delete employee.password;
    }

    const employeeUpdated = await EmployeeModel.findByIdAndUpdate(
      id,
      { ...employee, password: newPass },
      { new: true, runValidators: true }
    );

    if (!employeeUpdated) {
      throw new NotFoundError("User was not found");
    }

    return employeeUpdated;
  }

  async deleteEmployee(id) {
    const employeeDeleted = await EmployeeModel.findByIdAndRemove(id);

    if (!employeeDeleted) {
      throw new NotFoundError("User was not found");
    }

    return employeeDeleted;
  }
}

module.exports = new EmployeeService();
