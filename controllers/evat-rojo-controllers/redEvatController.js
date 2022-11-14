const getAllRedEvats = (req, res) => {
  res.json({
    result: "getAllRedEvats",
    success: "true",
  });
};

const getRedEvat = (req, res) => {
  res.json({
    result: "getRedEvat",
    success: "true",
  });
};

const addRedEvat = (req, res) => {
  res.json({
    result: "addRedEvat",
    success: "true",
  });
};

const updateRedEvat = (req, res) => {
  res.json({
    result: "updateRedEvat",
    success: "true",
  });
};

const deleteRedEvat = (req, res) => {
  res.json({
    result: "deleteRedEvat",
    success: "true",
  });
};

module.exports = {
  getAllRedEvats,
  getRedEvat,
  addRedEvat,
  deleteRedEvat,
  updateRedEvat,
};
