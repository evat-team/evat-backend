const { ResidentModel } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../errors");

const getAllResident = async (req, res) => {
  const residents = await ResidentModel.find();

  res.json({
    data: residents,
    success: "true",
  });
};

const getResident = async (req, res) => {
  const { id } = req.params;
  const resident = await ResidentModel.findById(id);

  if (!resident) {
    throw new NotFoundError("Residente no encontrado");
  }
  res.status(StatusCodes.ACCEPTED).json({
    data: Resident,
    success: "true",
  });
};

const addResident = async (req, res) => {
  const newResident = await ResidentModel.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newResident,
    success: "true",
  });
};

const updateResident = async (req, res) => {
  const { id } = req.params;

  const ResidentUpdated = await ResidentModel.findByIDUpdate(
    id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!ResidentUpdated) {
    throw new NotFoundError("Residente no encontrado");
  }

  res.status(StatusCodes.ACCEPTED).json({
    data: ResidentUpdated,
    success: "true",
  });
};

const deleteResident = async (req, res) => {
  const { id } = req.params;

  await ResidentModel.findByIDAndRemove(id);

  res.status(StatusCodes.ACCEPTED).json({
    data: null,
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
