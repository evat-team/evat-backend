const express = require("express");
const { notificationController } = require("../../controllers");

const router = express.Router();

router
  .route("/doctor-notifications/:idDoctor")
  .get(notificationController.getDoctorNotifications);

router
  .route("/new-doctor-notifications/:idDoctor")
  .get(notificationController.getNewDoctorNotifications);

router
  .route("/patient-notifications/:idPatient")
  .get(notificationController.getPatientNotifications);

router
  .route("/nurse-notifications/:idTransmitter")
  .get(notificationController.getNurseNotifications)
  .delete(notificationController.deleteNurseNotifications);

router
  .route("/confirm-notification/:id")
  .patch(notificationController.confirmNotification);

router
  .route("/not-seen-notification/:id")
  .patch(notificationController.notSeenNotification);

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
