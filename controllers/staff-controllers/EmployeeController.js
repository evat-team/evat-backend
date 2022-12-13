const { StatusCodes } = require("http-status-codes");
const { EmployeeService } = require("../../services");

const getAllEmployees = async (req, res) => {
  const users = await EmployeeService.returnAllEmployees();

  res.status(StatusCodes.OK).json({
    data: users,
    noResults: users.length,
    success: true,
  });
};

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

const getEmployee = async (req, res) => {
  const { id } = req.params;
  const user = await EmployeeService.returnSingleEmployee(id);

  res.status(StatusCodes.OK).json({
    data: user,
    success: true,
  });
};

const addEmployee = async (req, res) => {
  const newUser = await EmployeeService.createEmployee({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newUser,
    success: true,
  });
};

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

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await EmployeeService.deleteEmployee(id);

  res.status(StatusCodes.ACCEPTED).json({
    data: deletedUser,
    success: true,
  });
};

module.exports = {
  getAllEmployees,
  getFilteringEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
