const getAllDoctors = (req, res) => {
  res.json({
    result: "getAllDoctors",
    success: "true",
  });
};

const getDoctor = (req, res) => {
  res.json({
    result: "getDoctor",
    success: "true",
  });
};

const addDoctor = (req, res) => {
  res.json({
    result: "addDoctor",
    success: "true",
  });
};

const updateDoctor = (req, res) => {
  res.json({
    result: "updateDoctor",
    success: "true",
  });
};

const deleteDoctor = (req, res) => {
  res.json({
    result: "deleteDoctor",
    success: "true",
  });
};

module.exports = {
  getAllDoctors,
  getDoctor,
  addDoctor,
  deleteDoctor,
  updateDoctor,
};
