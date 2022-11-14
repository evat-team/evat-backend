const getAllMedicalResponses = (req, res) => {
  res.json({
    result: "getAllMedicalResponses",
    success: "true",
  });
};

const getMedicalResponse = (req, res) => {
  res.json({
    result: "getMedicalResponse",
    success: "true",
  });
};

const addMedicalResponse = (req, res) => {
  res.json({
    result: "addMedicalResponse",
    success: "true",
  });
};

const updateMedicalResponse = (req, res) => {
  res.json({
    result: "updateMedicalResponses",
    success: "true",
  });
};

const deleteMedicalResponse = (req, res) => {
  res.json({
    result: "deleteMedicalResponses",
    success: "true",
  });
};

module.exports = {
  getAllMedicalResponses,
  getMedicalResponse,
  addMedicalResponse,
  deleteMedicalResponse,
  updateMedicalResponse,
};
