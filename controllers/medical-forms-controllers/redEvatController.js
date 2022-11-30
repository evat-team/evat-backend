const RedEvatModel = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../errors");

const getAllRedEvats = async (req, res) => {
  const redEvats = await RedEvatModel.find();

  res.status(StatusCodes.OK).json({
    result: redEvats,
    success: "true",
  });
};

const getRedEvat = async (req, res) => {
  const { id } = req.params;

  const redEvat = await RedEvatModel.findById(id);

  if (!redEvat) throw new NotFoundError("Red evat not founded");

  res.status(StatusCodes.OK).json({
    result: redEvat,
    success: "true",
  });
};

const addRedEvat = async (req, res) => {
  const redEvat = await RedEvatModel.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: redEvat,
    success: "true",
  });
};

const updateRedEvat = async (req, res) => {
  const { id } = req.params;

  const newRedEvat = await RedEvatModel.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({
    result: newRedEvat,
    success: "true",
  });
};

const deleteRedEvat = async (req, res) => {
  const { id } = req.params;

  await RedEvatModel.findByIdAndRemove(id);

  res.status(StatusCodes.OK).json({
    result: "RedEvat message",
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
