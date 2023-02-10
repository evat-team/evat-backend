const { StatusCodes } = require("http-status-codes");
const { RedEvatService } = require("../../services");

// @ desc    Return all Red Evat forms
// @ access  Private
// @ method  GET
const getAllRedEvats = async (req, res) => {
  const redEvats = await RedEvatService.returnAllRedEvats();

  res.status(StatusCodes.OK).json({
    result: redEvats,
    noResults: redEvats.length,
    success: "true",
  });
};

// @ desc    Return a single Red Evat form
// @ access  Private
// @ method  GET
const getRedEvat = async (req, res) => {
  const { id } = req.params;

  const redEvat = await RedEvatService.returnRedEvatById(id);

  res.status(StatusCodes.OK).json({
    result: redEvat,
    success: "true",
  });
};

// @ desc    Create a new Red Evat form
// @ access  Private
// @ method  POST
const addRedEvat = async (req, res) => {
  const redEvat = await RedEvatService.createRedEvat({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: redEvat,
    success: "true",
  });
};

// @ desc    Update a Red Evat Form
// @ access  Private
// @ method  PATCH
const updateRedEvat = async (req, res) => {
  const { id } = req.params;

  const newRedEvat = await RedEvatService.updateRedEvatById(id, {
    ...req.body,
  });

  res.status(StatusCodes.ACCEPTED).json({
    result: newRedEvat,
    success: "true",
  });
};

// @ desc    Delete a Red Evat form
// @ access  Private
// @ method  DELETE
const deleteRedEvat = async (req, res) => {
  const { id } = req.params;

  const redEvatDeleted = await RedEvatService.deleteRedEvatById(id);

  res.status(StatusCodes.ACCEPTED).json({
    result: redEvatDeleted,
    success: "true",
  });
};

module.exports = {
  getAllRedEvats,
  getRedEvat,
  addRedEvat,
  deleteRedEvat,
  updateRedEvat,
};
