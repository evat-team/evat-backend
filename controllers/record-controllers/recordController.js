const { StatusCodes } = require("http-status-codes");
const { recordService } = require("../../services");

const getAllRecords = async (req, res) => {
  const records = await recordService.returnAllRecords();

  res.status(StatusCodes.OK).json({
    result: records,
    noResults: records.length,
    success: "true",
  });
};

const getRecord = async (req, res) => {
  const { id } = req.params;

  const record = await recordService.returnRecordById(id);

  res.status(StatusCodes.OK).json({
    result: record,
    success: "true",
  });
};

const addRecord = async (req, res) => {
  const newRecord = await recordService.createRecord({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    result: newRecord,
    success: "true",
  });
};

const updateRecord = async (req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).json({
    result: null,
    success: "false",
  });
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;

  const recordDeleted = await recordService.deleteRecordById(id);

  res.status(StatusCodes.ACCEPTED).json({
    result: recordDeleted,
    success: "true",
  });
};

module.exports = {
  getAllRecords,
  getRecord,
  addRecord,
  deleteRecord,
  updateRecord,
};
