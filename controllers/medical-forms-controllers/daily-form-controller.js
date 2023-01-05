const { StatusCodes } = require("http-status-codes");
const { DailyFormService } = require("../../services");

// @ desc    Return all Evat forms
// @ access  Private
// @ method  GET
const getAllDailyForms = async (req, res) => {
  const dailyForms = await DailyFormService.returnAllDailyForm();

  res.status(StatusCodes.OK).json({
    data: dailyForms,
    noResults: dailyForms.length,
    sucess: "true",
  });
};

// @ desc    Return an Evat form by id
// @ access  Private
// @ method  GET
const getDailyForm = async (req, res) => {
  const { id } = req.params;

  const dailyForm = await DailyFormService.returnDailyFormById(id);

  res.status(StatusCodes.OK).json({
    data: dailyForm,
    sucess: "true",
  });
};

// @ desc    Return all Evat forms
// @ access  Private
// @ method  GET
const getPatientForms = async (req, res) => {
  const { idPatient } = req.params;

  const forms = await DailyFormService.returnPatientForms(idPatient);

  res.status(StatusCodes.OK).json({
    result: forms,
    sucess: "true",
  });
};

// @ desc    Create an Evat form
// @ access  Private
// @ method  POST
const addDailyForm = async (req, res) => {
  const newDailyForm = await DailyFormService.createDailyForm({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    data: newDailyForm,
    sucess: "true",
  });
};

// @ desc    Update an Evat form by id
// @ access  Private
// @ method  UPDATE
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

// @ desc    Remove an Evat form by id
// @ access  Private
// @ method  Delete
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
  getPatientForms,
};
