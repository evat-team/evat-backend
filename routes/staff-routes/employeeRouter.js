const express = require("express");
const { employeeController } = require("../../controllers");

const router = express.Router();

router.route("/filter").get(employeeController.getFilteringEmployees);

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.addEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
