const express = require("express");
const { qaController } = require("../../controllers");

const qaRouter = express.Router();

qaRouter.route("/").get(qaController.getAllQa).post(qaController.addQa);

qaRouter
  .route("/:id")
  .get(qaController.getQa)
  .patch(qaController.updateQa)
  .delete(qaController.deleteQa);

module.exports = qaRouter;
