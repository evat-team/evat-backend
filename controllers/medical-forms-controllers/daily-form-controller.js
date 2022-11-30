const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../errors");
const DailyFormModel = require("../../models");

const getAllDailyForms = async (req, res) => {
  const dailyForms = await DailyFormModel.find();

  res.status(StatusCodes.OK).json({
    data: dailyForms,
    sucess: "true",
  });
};

const getDailyForm = async (req, res) => {
  const { id } = req.parmas;

  const dailyForm = await DailyFormModel.findById(id);

  if (!dailyForm) throw new NotFoundError("Daily form was not founded");

  res.status(StatusCodes.OK).json({
    data: dailyForm,
    sucess: "true",
  });
};

const addDailyForm = async (req, res) => {
  const newDailyForm = await DailyFormModel.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    data: newDailyForm,
    sucess: "true",
  });
};

const updateDailyForm = async (req, res) => {
  const { id } = req.params;

  const newDailyForm = await DailyFormModel.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({
    data: newDailyForm,
    sucess: "true",
  });
};

const deleteDailyForm = async (req, res) => {
  const { id } = req.params;

  await DailyFormModel.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({
    data: "dailyForm deleted",
    sucess: "true",
  });
};

module.exports = {
  getAllDailyForms,
  getDailyForm,
  addDailyForm,
  updateDailyForm,
  deleteDailyForm,
};
