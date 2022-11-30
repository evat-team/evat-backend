const QaModel = require("../../models");
const { NotFoundError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const getAllQa = async (req, res) => {
  const qas = await QaModel.find();

  res.status(StatusCodes.OK).json({
    result: qas,
    success: "true",
  });
};

const getQa = async (req, res) => {
  const { id } = req.params;

  const qa = QaModel.findById(id);

  if (!qa) {
    throw new NotFoundError("Qa was not founded");
  }

  res.status(StatusCodes.OK).json({
    result: qa,
    success: "true",
  });
};

const addQa = async (req, res) => {
  const newQa = await QaModel.create(...req.body);

  res.status(StatusCodes.CREATED).json({
    result: newQa,
    success: "true",
  });
};

const deleteQa = async (req, res) => {
  const { id } = req.params;

  await QaModel.findByIdAndRemove(id);

  res.status(StatusCodes.OK).json({
    result: "Qa removed",
    success: "true",
  });
};

const updateQa = async (req, res) => {
  const { id } = req.params;

  await QaModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({
    result: "deleted Qa",
    success: "true",
  });
};

module.exports = {
  getAllQa,
  getQa,
  addQa,
  deleteQa,
  updateQa,
};
