const { RecordModel } = require("../../models");
const { NotFoundError } = require("../../errors");

class RecordService {
  async returnAllRecords() {
    const records = await RecordModel.find();

    return records;
  }

  async returnRecordById(id) {
    const record = await RecordModel.findById(id);

    if (!record) {
      throw new NotFoundError("Record was not found");
    }

    return record;
  }

  async createRecord(recordInfo) {
    const newRecord = await RecordModel.create({ ...recordInfo });

    return newRecord;
  }

  async deleteRecordById(id) {
    const recordDeleted = await RecordModel.findByIdAndRemove(id);

    if (!recordDeleted) {
      throw new NotFoundError("Record was not found");
    }

    return recordDeleted;
  }

  async clearHistory() {
    const results = await RecordModel.deleteMany();
    return results;
  }
}

module.exports = new RecordService();
