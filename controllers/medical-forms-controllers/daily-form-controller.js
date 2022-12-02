const { StatusCodes } = require("http-status-codes");
const { dailyFormService } = require("../../services");

const getAllDailyForms = async (req, res) => {
  const dailyForms = await dailyFormService.returnAllDailyForms();

  res.status(StatusCodes.OK).json({
    data: dailyForms,
    noResults: dailyForms.length,
    sucess: "true",
  });
};

const getDailyForm = async (req, res) => {
  const { id } = req.params;

  const dailyForm = await dailyFormService.returnDailyFormById(id);

  res.status(StatusCodes.OK).json({
    data: dailyForm,
    sucess: "true",
  });
};

const addDailyForm = async (req, res) => {
  const newDailyForm = await dailyFormService.createDailyForm({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    data: newDailyForm,
    sucess: "true",
  });
};

const updateDailyForm = async (req, res) => {
  const { id } = req.params;

  const newDailyForm = await dailyFormService.updateDailyFormById(id, {
    ...req.body,
  });

  res.status(StatusCodes.OK).json({
    data: newDailyForm,
    sucess: "true",
  });
};

const deleteDailyForm = async (req, res) => {
  const { id } = req.params;

  const dailyFormDeleted = await dailyFormService.deleteDailyFormById(id);

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
