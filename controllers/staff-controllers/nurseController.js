const { NurseModel } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../errors");

const getAllNurses = async (req, res) => {
  const nurses = await NurseModel.find();

  res.status(StatusCodes.ACCEPTED).json({
    data: nurses,
    success: "true",
  });
};

const getNurse = async (req, res) => {
  const { id } = req.params;

  const nurse = await NurseModel.findById(id);

  if (!nurse) {
    throw new NotFoundError("Enfermera no encontrada");
  }

  res.status(StatusCodes.ACCEPTED).json({
    data: nurse,
    success: "true",
  });
};

const addNurse = async (req, res) => {
  const newNurse = await NurseModel.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newNurse,
    success: "true",
  });
};

const updateNurse = async (req, res) => {
  const { id } = req.params;

  const nurseUpdated = await NurseModel.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!nurseUpdated) {
    throw new NotFoundError("Enfermera no encontrada");
  }

  res.status(StatusCodes.ACCEPTED).json({
    data: nurseUpdated,
    success: "true",
  });
};

const deleteNurse = async (req, res) => {
  const { id } = req.params;

  await NurseModel.findByIdAndRemove(id);

  res.status(StatusCodes.ACCEPTED).json({
    data: null,
    success: "true",
  });
};

module.exports = {
  getAllNurses,
  getNurse,
  addNurse,
  deleteNurse,
  updateNurse,
};
