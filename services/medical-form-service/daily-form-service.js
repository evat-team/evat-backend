const { NotFoundError } = require("../../errors");
const { DailyFormModel } = require("../../models");

class DailyFormService {
  async returnAllDailyForm() {
    const dailyForms = await DailyFormModel.find();

    return dailyForms;
  }

  async returnDailyFormById(id) {
    const dailyForm = await DailyFormModel.findById(id);

    if (!dailyForm) {
      throw new NotFoundError("Daily Form was not found");
    }

    return dailyForm;
  }

  async createDailyForm(newForm) {
    const newDailyForm = await DailyFormModel.create({ ...newForm });

    return newDailyForm;
  }

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

  async deleteDailyFormById(id) {
    const dailyFormRemoved = await DailyFormModel.findByIdAndDelete(id);

    if (!dailyFormRemoved) {
      throw new NotFoundError("Daily form was not found");
    }

    return dailyFormRemoved;
  }
}

module.exports = new DailyFormService();
