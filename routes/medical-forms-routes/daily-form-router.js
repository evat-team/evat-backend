const express = require("express");
const { dailyFormController } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(dailyFormController.getAllDailyForms)
  .post(dailyFormController.addDailyForm);

router
  .route("/:id")
  .get(dailyFormController.getDailyForm)
  .patch(dailyFormController.updateDailyForm)
  .delete(dailyFormController.deleteDailyForm);

module.exports = router;
