const { NotFoundError } = require("../../errors");
const { DailyFormModel } = require("../../models");

const returnAllDailyForms = async () => {
  const dailyForms = await DailyFormModel.find();

  return dailyForms;
};

const returnDailyFormById = async (id) => {
  const dailyForm = await DailyFormModel.findById(id);

  if (!dailyForm) {
    throw new NotFoundError("Daily form was not founded");
  }

  return dailyForm;
};

const createDailyForm = async (newForm) => {
  const newDailyForm = await DailyFormModel.create({ ...newForm });

  return newDailyForm;
};

const updateDailyFormById = async (id, newDailyFormInfo) => {
  const newDailyForm = await DailyFormModel.findByIdAndUpdate(
    id,
    { ...newDailyFormInfo },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!newDailyForm) {
    throw new NotFoundError("Daily was not founded");
  }

  return newDailyForm;
};

const deleteDailyFormById = async (id) => {
  const dailyFormRemoved = await DailyFormModel.findByIdAndDelete(id);

  if (!dailyFormRemoved) {
    throw new NotFoundError("Daily form was not founded");
  }

  return dailyFormRemoved;
};

module.exports = {
  returnAllDailyForms,
  returnDailyFormById,
  createDailyForm,
  updateDailyFormById,
  deleteDailyFormById,
};
