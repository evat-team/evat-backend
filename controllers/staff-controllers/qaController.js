const { qaService } = require("../../services");
const { StatusCodes } = require("http-status-codes");

const getAllQa = async (req, res) => {
  const qas = await qaService.returnAllQas();

  res.status(StatusCodes.OK).json({
    result: qas,
    noResults: qas.length,
    success: "true",
  });
};

const getQa = async (req, res) => {
  const { id } = req.params;

  const qa = await qaService.returnQaById(id);

  res.status(StatusCodes.OK).json({
    result: qa,
    success: "true",
  });
};

const addQa = async (req, res) => {
  const newQa = await qaService.createQa({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newQa,
    success: "true",
  });
};

const deleteQa = async (req, res) => {
  const { id } = req.params;

  const qaRemoved = await qaService.deleteQaById(id);

  res.status(StatusCodes.ACCEPTED).json({
    result: qaRemoved,
    success: "true",
  });
};

const updateQa = async (req, res) => {
  const { id } = req.params;

  const qaUpdated = await qaService.updateQaById(id, { ...req.body });

  res.status(StatusCodes.ACCEPTED).json({
    result: qaUpdated,
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
