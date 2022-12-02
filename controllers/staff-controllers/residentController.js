const { StatusCodes } = require("http-status-codes");
const { residentService } = require("../../services");

const getAllResident = async (req, res) => {
  const residents = await residentService.returnAllResident();

  res.status(StatusCodes.OK).json({
    data: residents,
    noResults: residents.length,
    success: "true",
  });
};

const getResident = async (req, res) => {
  const { id } = req.params;
  const resident = await residentService.returnResidentById(id);

  res.status(StatusCodes.OK).json({
    data: resident,
    success: "true",
  });
};

const addResident = async (req, res) => {
  const newResident = await residentService.createResident({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newResident,
    success: "true",
  });
};

const updateResident = async (req, res) => {
  const { id } = req.params;

  const residentUpdated = await residentService.updateResidentById(id, {
    ...req.body,
  });

  res.status(StatusCodes.ACCEPTED).json({
    data: residentUpdated,
    success: "true",
  });
};

const deleteResident = async (req, res) => {
  const { id } = req.params;

  const residentRemoved = await residentService.removeResidentById(id);

  res.status(StatusCodes.ACCEPTED).json({
    data: residentRemoved,
    success: "true",
  });
};

module.exports = {
  getAllResident,
  getResident,
  addResident,
  deleteResident,
  updateResident,
};
