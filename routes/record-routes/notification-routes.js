const express = require("express");
const { notificationController } = require("../../controllers");

const router = express.Router();

router
  .route("/doctor-notifications/:idDoctor")
  .get(notificationController.getDoctorNotifications)
  .delete(notificationController.deleteDoctorNotifications);

router
  .route("/patient-notifications/:idPatient")
  .get(notificationController.getPatientNotifications);

router
  .route("/nurse-notifications/:idTransmitter")
  .get(notificationController.getNurseNotifications);

router
  .route("/confirm-notification/:id")
  .patch(notificationController.confirmNotification);

router
  .route("/")
  .get(notificationController.getAllNotifications)
  .post(notificationController.addNotification);

router
  .route("/:id")
  .get(notificationController.getNotification)
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);

module.exports = router;
