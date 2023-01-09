const { NotFoundError } = require("../../errors");
const { DailyFormModel, PatientModel } = require("../../models");
const APIQuery = require("../../utils/api-query");

/**
 * @typedef  {Object} EvatFormObject
 * @property {Number} hour Number of the hour
 * @property {String} temperature
 * @property {Number} bloodPressure
 * @property {Number} FC Heart rate
 * @property {Number} FR Respiratory rate
 * @property {mongoose.Types.ObjectId} idPatient
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
    const patient = await PatientModel.findById(idPatient);

    if (patient) {
      throw new NotFoundError("Patient no longer exists");
    }

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
    const newDailyForm = await DailyFormModel.create({
      hour: newForm.hour,
      temperature: newForm.temperature,
      bloodPressure: newForm.bloodPressure,
      FC: newForm.FC,
      FR: newForm.FR,
      SO2: newForm.SO2,
      ltsO2: newForm.ltsO2,
      pain: newForm.pain,
      capillaryRefill: newForm.capillaryRefill,
      rightPupil: newForm.rightPupil,
      leftPupi: newForm.leftPupil,
      neuro: newForm.neuro,
      cardio: newForm.cardio,
      resp: newForm.resp,
      nurseConcern: newForm.nurseConcern,
      familyConcern: newForm.familyConcern,
      idPatient: newForm.idPatient,
    });

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
      {
        hour: newDailyFormInfo.hour,
        temperature: newDailyFormInfo.temperature,
        bloodPressure: newDailyFormInfo.bloodPressure,
        FC: newDailyFormInfo.FC,
        FR: newDailyFormInfo.FR,
        SO2: newDailyFormInfo.SO2,
        ltsO2: newDailyFormInfo.ltsO2,
        pain: newDailyFormInfo.pain,
        capillaryRefill: newDailyFormInfo.capillaryRefill,
        rightPupil: newDailyFormInfo.rightPupil,
        leftPupi: newDailyFormInfo.leftPupil,
        neuro: newDailyFormInfo.neuro,
        cardio: newDailyFormInfo.cardio,
        resp: newDailyFormInfo.resp,
        nurseConcern: newDailyFormInfo.nurseConcern,
        familyConcern: newDailyFormInfo.familyConcern,
        idPatient: newDailyFormInfo.idPatient,
      },
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

  /**
   *
   * @param {mongoose.Types.ObjectId} id
   * @returns {Array<EvatFormObject>} Evat forms deleted
   * @throws {NotFoundError} In case patient was not found
   */
  async removeAllPatientForms(idPatient) {
    const patient = await PatientModel.findById(idPatient);

    if (patient) {
      throw new NotFoundError("Patient no longer exists");
    }

    const forms = await DailyFormModel.deleteMany({ idPatient });

    return forms;
  }
}

module.exports = new DailyFormService();
