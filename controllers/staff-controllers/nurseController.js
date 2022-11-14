const getAllNurses = (req, res) => {
  res.json({
    result: "getAllNurses",
    success: "true",
  });
};

const getNurse = (req, res) => {
  res.json({
    result: "getNurse",
    success: "true",
  });
};

const addNurse = (req, res) => {
  res.json({
    result: "addNurse",
    success: "true",
  });
};

const updateNurse = (req, res) => {
  res.json({
    result: "updateNurse",
    success: "true",
  });
};

const deleteNurse = (req, res) => {
  res.json({
    result: "deleteNurse",
    success: "true",
  });
};

module.exports = {
  getAllNurses,
  getNurse,
  addNurse,
  deleteNurse,
  updateNurse,
};
