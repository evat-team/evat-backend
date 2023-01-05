const express = require("express");
const { recordController } = require("../../controllers");

const router = express.Router();

router.route("/clean-history").delete(recordController.deleteAllRecords);

router
  .route("/")
  .get(recordController.getAllRecords)
  .post(recordController.addRecord);

router
  .route("/:id")
  .get(recordController.getRecord)
  .patch(recordController.updateRecord)
  .delete(recordController.deleteRecord);

module.exports = router;
