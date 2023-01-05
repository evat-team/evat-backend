const { StatusCodes } = require("http-status-codes");
const { RecordService } = require("../../services");

const getAllRecords = async (req, res) => {
  const records = await RecordService.returnAllRecords();

  res.status(StatusCodes.OK).json({
    result: records,
    noResults: records.length,
    success: "true",
  });
};

const getRecord = async (req, res) => {
  const { id } = req.params;

  const record = await RecordService.returnRecordById(id);

  res.status(StatusCodes.OK).json({
    result: record,
    success: "true",
  });
};

const addRecord = async (req, res) => {
  const newRecord = await RecordService.createRecord({ ...req.body });

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

const deleteAllRecords = async (req, res) => {
  const recordsDeleted = await RecordService.clearHistory();

  res.status(StatusCodes.ACCEPTED).json({
    result: recordsDeleted,
    results: recordsDeleted.length,
    success: "true",
  });
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;

  const recordDeleted = await RecordService.deleteRecordById(id);

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
  deleteAllRecords,
};
