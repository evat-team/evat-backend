const getAllResident = (req, res) => {
  res.json({
    result: "getAllResident",
    success: "true",
  });
};

const getResident = (req, res) => {
  res.json({
    result: "getResident",
    success: "true",
  });
};

const addResident = (req, res) => {
  res.json({
    result: "addResident",
    success: "true",
  });
};

const updateResident = (req, res) => {
  res.json({
    result: "updateResident",
    success: "true",
  });
};

const deleteResident = (req, res) => {
  res.json({
    result: "deleteResident",
    success: "true",
  });
};

module.exports = {
  getAllResident,
  getResident,
  addResident,
  deleteResident,
  updateResident,
};
