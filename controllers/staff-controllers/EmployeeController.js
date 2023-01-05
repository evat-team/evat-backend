const { StatusCodes } = require("http-status-codes");
const { EmployeeService } = require("../../services");

// @ desc    Return all employees
// @ access  Private
// @ method  GET
const getAllEmployees = async (req, res) => {
  const users = await EmployeeService.returnAllEmployees();

  res.status(StatusCodes.OK).json({
    data: users,
    noResults: users.length,
    success: true,
  });
};

// @ desc    Return employees matched with the query
// @ access  Private
// @ method  GET
const getFilteringEmployees = async (req, res) => {
  const results = await EmployeeService.returnFilteringResults({
    ...req.query,
  });

  res.status(StatusCodes.OK).json({
    data: results,
    noResults: results.length,
    success: true,
  });
};

// @ desc    Return employee by id
// @ access  Private
// @ method  GET
const getEmployee = async (req, res) => {
  const { id } = req.params;
  const user = await EmployeeService.returnSingleEmployee(id);

  res.status(StatusCodes.OK).json({
    data: user,
    success: true,
  });
};

// @ desc    Create a new employee
// @ access  Private
// @ method  POST
const addEmployee = async (req, res) => {
  const newUser = await EmployeeService.createEmployee({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newUser,
    success: true,
  });
};

// @ desc    Update an employee
// @ access  Private
// @ method  PATCH
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await EmployeeService.updateEmployee(id, {
    ...req.body,
  });

  res.status(StatusCodes.ACCEPTED).json({
    data: updatedUser,
    success: true,
  });
};

// @ desc    Change the password of an employee
// @ access  Private
// @ method  POST
const changePassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  const user = await EmployeeService.changePassword(id, password);

  res.status(StatusCodes.ACCEPTED).json({
    data: user,
    success: true,
  });
};

// @ desc    Remove an employee by id
// @ access  Private
// @ method  DELETE
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await EmployeeService.deleteEmployee(id);

  res.status(StatusCodes.ACCEPTED).json({
    data: deletedUser,
    success: true,
  });
};

// @ desc    Return all employee with a NURSE role
// @ access  Private
// @ method  GET
const getAllNurses = async (req, res, next) => {
  req.query.role = "NURSE";
  next();
};

// @ desc    Return all employee with a Doctor role
// @ access  Private
// @ method  GET
const getAllDoctors = async (req, res, next) => {
  req.query.role = "DOCTOR";
  next();
};

module.exports = {
  getAllEmployees,
  getFilteringEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  changePassword,
  getAllNurses,
  getAllDoctors,
};
