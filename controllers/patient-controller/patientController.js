const getAllPatients = (req, res) => {
  res.json({
    result: "getAllPatients",
    success: "true",
  });
};

const getPatient = (req, res) => {
  res.json({
    result: "getPatient",
    success: "true",
  });
};

const addPatient = (req, res) => {
  res.json({
    result: "addPatient",
    success: "true",
  });
};

const updatePatient = (req, res) => {
  res.json({
    result: "updatePatient",
    success: "true",
  });
};

const deletePatient = (req, res) => {
  res.json({
    result: "deletePatient",
    success: "true",
  });
};

module.exports = {
  getAllPatients,
  getPatient,
  addPatient,
  deletePatient,
  updatePatient,
};
