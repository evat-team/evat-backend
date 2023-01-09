const { RecordModel } = require("../../models");
const { NotFoundError } = require("../../errors");

/**
 * @typedef {Object} RecordObject
 * @property {String} title
 * @property {String} description
 * @property {mongoose.Types.ObjectId} adminAction
 */

/**
 * @class Provide several functions to communicate with the record collection
 */
class RecordService {
  /**
   * @return {Array<RecordObject>} All Records
   */
  async returnAllRecords() {
    const records = await RecordModel.find();

    return records;
  }

  /**
   *
   * @param {mongoose.Types.ObjectID} id Record id
   * @returns {RecordObject} Information of a single record
   * @throws {NotFoundError} In case record was not found
   */
  async returnRecordById(id) {
    const record = await RecordModel.findById(id);

    if (!record) {
      throw new NotFoundError("Record was not found");
    }

    return record;
  }

  /**
   *
   * @param {RecordObject} recordInfo
   * @returns {RecordObject} New record created
   */
  async createRecord(recordInfo) {
    const newRecord = await RecordModel.create({ ...recordInfo });

    return newRecord;
  }

  /**
   *
   * @param {mongoose.Types.ObjectID} id Record id
   * @returns {RecordObject} Record deleted
   * @throws {NotFoundError} In case record was not found
   */
  async deleteRecordById(id) {
    const recordDeleted = await RecordModel.findByIdAndRemove(id);

    if (!recordDeleted) {
      throw new NotFoundError("Record was not found");
    }

    return recordDeleted;
  }

  /**
   * @returns {Array<RecordObject>} All records deleted
   */
  async clearHistory() {
    const results = await RecordModel.deleteMany();
    return results;
  }
}

module.exports = new RecordService();
