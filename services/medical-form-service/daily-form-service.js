const { NotFoundError } = require("../../errors");
const { DailyFormModel } = require("../../models");
const APIQuery = require("../../utils/api-query");

/**
 * @typedef  {Object} EvatFormObject
 * @property {Number} hour Number of the hour
 * @property {String} temperature
 * @property {Number} bloodPressure
 * @property {Number} FC Heart rate
 * @property {Number} FR Respiratory rate
 * @property {mongoose.Types.ObjectId} [idPatient]
 * @property {Number} SO2
 * @property {Number} ltsO2
 * @property {Number} pain
 * @property {Number} capillaryRefill
 * @property {String} rightPupil "R"-"NR"
 * @property {String} leftPupil"R"-"NR"
 * @property {Number} neuro
 * @property {Number} cardio
 * @property {Number} resp
 * @property {Number} nurseConcern
 * @property {Number} familyConcern
 */

/**
 * @class Provide several functions to interact with  the daily form collection
 * @descriptionn Handle the logic to interact with the daily form collection
 */
class DailyFormService {
  /**
   *
   * @returns {Array<EvatFormObject>} Return all Evat forms
   */
  async returnAllDailyForm() {
    const dailyForms = await DailyFormModel.find();

    return dailyForms;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id
   * @returns Return an Evat form by id
   * @throws {NotFoundError} In case that the patient was not found
   */
  async returnDailyFormById(id) {
    const dailyForm = await DailyFormModel.findById(id);

    if (!dailyForm) {
      throw new NotFoundError("Daily Form was not found");
    }

    return dailyForm;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idPatient
   * @returns {Array<Object>} Evat forms of a patient
   */
  async returnPatientForms(idPatient) {
    const results = await DailyFormModel.find({ idPatient });
    return results;
  }

  /**
   *
   * @param {Object} query
   * @returns {Array<Object>} Evat forms mached with the query
   */
  async returnFilteringForms(query) {
    const queryFilter = DailyFormModel.find();

    const results = new APIQuery({ ...query }, queryFilter)
      .filter()
      .sort("createdAt")
      .endFilter();

    return results;
  }

  /**
   *
   * @param {EvatFormObject} newForm
   * @returns Evat form created in the DB
   */
  async createDailyForm(newForm) {
    const newDailyForm = await DailyFormModel.create({ ...newForm });

    return newDailyForm;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Evat form id
   * @param {EvatFormObject} newDailyFormInfo
   * @returns {EvatFormObject} Evat form updated
   * @throws {NotFoundError} In case that the patient was not found
   */
  async updateDailyFormById(id, newDailyFormInfo) {
    const newDailyForm = await DailyFormModel.findByIdAndUpdate(
      id,
      { ...newDailyFormInfo },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newDailyForm) {
      throw new NotFoundError("Daily Form was not found");
    }

    return newDailyForm;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id
   * @returns {EvatFormObject} Evat form deleted
   * @throws {NotFoundError} In case that the patient was not found
   */
  async deleteDailyFormById(id) {
    const dailyFormRemoved = await DailyFormModel.findByIdAndDelete(id);

    if (!dailyFormRemoved) {
      throw new NotFoundError("Daily form was not found");
    }

    return dailyFormRemoved;
  }
}

module.exports = new DailyFormService();
