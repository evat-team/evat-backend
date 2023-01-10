const express = require("express");
const { employeeController } = require("../../controllers");

const router = express.Router();

router.route("/filter").get(employeeController.getFilteringEmployees);

router
  .route("/nurses")
  .get(
    employeeController.getAllNurses,
    employeeController.getFilteringEmployees
  );

router
  .route("/doctors")
  .get(
    employeeController.getAllDoctors,
    employeeController.getFilteringEmployees
  );

router.route("/change-password/:id").post(employeeController.changePassword);

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
