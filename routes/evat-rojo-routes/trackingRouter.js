const express = require("express");
const { trackingController } = require("./../../controllers");

const router = express.Router();

router
  .route("/")
  .get(trackingController.getAllTrackings)
  .post(trackingController.addTracking);

router
  .route("/:id")
  .get(trackingController.getTracking)
  .patch(trackingController.updateTracking)
  .delete(trackingController.deleteTracking);

module.exports = router;
