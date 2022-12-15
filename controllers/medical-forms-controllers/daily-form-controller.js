const { StatusCodes } = require("http-status-codes");
const { DailyFormService } = require("../../services");

const getAllDailyForms = async (req, res) => {
  const dailyForms = await DailyFormService.returnAllDailyForm();

  res.status(StatusCodes.OK).json({
    data: dailyForms,
    noResults: dailyForms.length,
    sucess: "true",
  });
};

const getDailyForm = async (req, res) => {
  const { id } = req.params;

  const dailyForm = await DailyFormService.returnDailyFormById(id);

  res.status(StatusCodes.OK).json({
    data: dailyForm,
    sucess: "true",
  });
};

const addDailyForm = async (req, res) => {
  const newDailyForm = await DailyFormService.createDailyForm({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    data: newDailyForm,
    sucess: "true",
  });
};

const updateDailyForm = async (req, res) => {
  const { id } = req.params;

  const newDailyForm = await DailyFormService.updateDailyFormById(id, {
    ...req.body,
  });

  res.status(StatusCodes.OK).json({
    data: newDailyForm,
    sucess: "true",
  });
};

const deleteDailyForm = async (req, res) => {
  const { id } = req.params;

  const dailyFormDeleted = await DailyFormService.deleteDailyFormById(id);

  res.status(StatusCodes.OK).json({
    data: dailyFormDeleted,
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
