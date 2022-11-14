const getAllQa = (req, res) => {
  res.json({
    result: "getAllQa",
    success: "true",
  });
};

const getQa = (req, res) => {
  res.json({
    result: "getQa",
    success: "true",
  });
};

const addQa = (req, res) => {
  res.json({
    result: "addQa",
    success: "true",
  });
};

const updateQa = (req, res) => {
  res.json({
    result: "updateQa",
    success: "true",
  });
};

const deleteQa = (req, res) => {
  res.json({
    result: "deleteQa",
    success: "true",
  });
};

module.exports = {
  getAllQa,
  getQa,
  addQa,
  deleteQa,
  updateQa,
};
