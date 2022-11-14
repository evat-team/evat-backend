const getAllTrackings = (req, res) => {
  res.json({
    result: "getAllTrackings",
    success: "true",
  });
};

const getTracking = (req, res) => {
  res.json({
    result: "getTracking",
    success: "true",
  });
};

const addTracking = (req, res) => {
  res.json({
    result: "addTracking",
    success: "true",
  });
};

const updateTracking = (req, res) => {
  res.json({
    result: "updateTracking",
    success: "true",
  });
};

const deleteTracking = (req, res) => {
  res.json({
    result: "deleteTracking",
    success: "true",
  });
};

module.exports = {
  getAllTrackings,
  getTracking,
  addTracking,
  deleteTracking,
  updateTracking,
};
