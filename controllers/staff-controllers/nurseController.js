const { StatusCodes } = require("http-status-codes");
const { nurseService } = require("../../services");

const getAllNurses = async (req, res) => {
  const nurses = await nurseService.returnAllNurses();

  res.status(StatusCodes.ACCEPTED).json({
    data: nurses,
    noResults: nurses.length,
    success: "true",
  });
};

const getNurse = async (req, res) => {
  const { id } = req.params;

  const nurse = await nurseService.returnNurseById(id);

  res.status(StatusCodes.ACCEPTED).json({
    data: nurse,
    success: "true",
  });
};

const addNurse = async (req, res) => {
  const newNurse = await nurseService.createNurse({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    data: newNurse,
    success: "true",
  });
};

const updateNurse = async (req, res) => {
  const { id } = req.params;

  const nurseUpdated = await nurseService.updateNurseById(id, { ...req.body });

  res.status(StatusCodes.ACCEPTED).json({
    data: nurseUpdated,
    success: "true",
  });
};

const deleteNurse = async (req, res) => {
  const { id } = req.params;

  const nurseDeleted = await nurseService.deleteNurseById(id);

  res.status(StatusCodes.ACCEPTED).json({
    data: nurseDeleted,
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
