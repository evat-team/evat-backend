const getAllRecords = (req, res) => {
  res.json({
    result: "getAllRecords",
    success: "true",
  });
};

const getRecord = (req, res) => {
  res.json({
    result: "getRecord",
    success: "true",
  });
};

const addRecord = (req, res) => {
  res.json({
    result: "addRecord",
    success: "true",
  });
};

const updateRecord = (req, res) => {
  res.json({
    result: "updateRecord",
    success: "true",
  });
};

const deleteRecord = (req, res) => {
  res.json({
    result: "deleteRecord",
    success: "true",
  });
};

module.exports = {
  getAllRecords,
  getRecord,
  addRecord,
  deleteRecord,
  updateRecord,
};
