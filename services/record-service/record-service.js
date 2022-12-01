const { RecordModel } = require("../../models");
const { NotFoundError } = require("../../errors");

const returnAllRecords = async () => {
  const records = await RecordModel.find();

  return records;
};

const returnRecordById = async (id) => {
  const record = await RecordModel.findById(id);

  if (!record) {
    throw new NotFoundError("Record not founded");
  }

  return record;
};

const createRecord = async (recordInfo) => {
  const newRecord = RecordModel.create({ ...recordInfo });

  return newRecord;
};

const deleteRecordById = async (id) => {
  const recordDeleted = RecordModel.findByIdAndRemove(id);

  if (!recordDeleted) {
    throw new NotFoundError("Record not founded");
  }

  return recordDeleted;
};

module.exports = {
  returnAllRecords,
  returnRecordById,
  createRecord,
  deleteRecordById,
};
