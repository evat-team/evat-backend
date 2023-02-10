const express = require("express");
const { redEvatController } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(redEvatController.getAllRedEvats)
  .post(redEvatController.addRedEvat);

router
  .route("/:id")
  .get(redEvatController.getRedEvat)
  .patch(redEvatController.updateRedEvat)
  .delete(redEvatController.deleteRedEvat);

module.exports = router;
