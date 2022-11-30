const express = require("express");
const { nurseController } = require("../../controllers");
const middlewares = require("../../middlewares");

const nurseRouter = express.Router();

nurseRouter
  .route("/")
  .get(nurseController.getAllNurses)
  .post(nurseController.addNurse);

nurseRouter
  .route("/:id")
  .get(nurseController.getNurse)
  .patch(nurseController.updateNurse)
  .delete(nurseController.deleteNurse);

module.exports = nurseRouter;
