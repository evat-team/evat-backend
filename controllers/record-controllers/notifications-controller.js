const { StatusCodes } = require("http-status-codes");
const { NotificationService } = require("../../services");

// @ desc    Return all notifications
// @ access  Private
// @ method  GET
const getAllNotifications = async (req, res) => {
  const notifications = await NotificationService.returnAllNotifications();

  res.status(StatusCodes.OK).json({
    result: notifications,
    noResults: notifications.length,
    success: "true",
  });
};

// @ desc    Return a notification by id
// @ access  Private
// @ method  GET
const getNotification = async (req, res) => {
  const { id } = req.params;
  const notification = await NotificationService.returnSingleNotification(id);

  res.status(StatusCodes.OK).json({
    result: notification,
    success: "true",
  });
};

// @ desc    Return all notifications matched with a patient id
// @ access  Private
// @ method  GET
const getPatientNotifications = async (req, res) => {
  const { idPatient } = req.params;

  const patientNotifications =
    await NotificationService.returnPatientNotifications(idPatient);

  res.status(StatusCodes.OK).json({
    result: patientNotifications,
    noResults: patientNotifications.length,
    sucess: "true",
  });
};

// @ desc    Return all notifications matched with a doctor id
// @ access  Private
// @ method  GET
const getDoctorNotifications = async (req, res) => {
  const { idDoctor } = req.params;
  const notifications = await NotificationService.returnDoctorNotifications(
    idDoctor
  );

  res.status(StatusCodes.OK).json({
    result: notifications,
    noResults: notifications.length,
    success: "true",
  });
};

// @ desc    Return all notifications matched with a Nurse
// @ access  Private
// @ method  GET
const getNurseNotifications = async (req, res) => {
  const { idTransmitter } = req.params;

  const notifications = await NotificationService.returnNurseNotifications(
    idTransmitter
  );

  res.status(StatusCodes.OK).json({
    result: notifications,
    noResults: notifications.length,
    success: "true",
  });
};

// @ desc    Create a new notification
// @ access  Private
// @ method  POST
const addNotification = async (req, res) => {
  const notification = await NotificationService.createNotification({
    ...req.body,
  });

  res.status(StatusCodes.CREATED).json({
    result: notification,
    success: "true",
  });
};

// @ desc    Update a notification
// @ access  Private
// @ method  PATCH
const updateNotification = async (req, res) => {
  const { id } = req.params;
  const notification = await NotificationService.updateNotification(id, {
    ...req.body,
  });

  res.status(StatusCodes.ACCEPTED).json({
    result: notification,
    success: "true",
  });
};

// @ desc    Update the 'confirm' value as true
// @ access  Private
// @ method  PATCH
const confirmNotification = async (req, res) => {
  const { id } = req.params;

  const notification = await NotificationService.notificationConfirmed(id);

  res.status(StatusCodes.ACCEPTED).json({
    result: notification,
    success: "true",
  });
};

// @ desc    Delete a single notification
// @ access  Private
// @ method  DELETE
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  const notification = await NotificationService.deleteSingleNotification(id);

  res.status(StatusCodes.ACCEPTED).json({
    result: notification,
    success: "true",
  });
};

// @ desc    Delete all notifications matched with a doctor id
// @ access  Private
// @ method  DELETE
const deleteDoctorNotifications = async (req, res) => {
  const { idDoctor } = req.params;

  const notifications = await NotificationService.deleteAllDoctorNotifications(
    idDoctor
  );

  res.status(StatusCodes.ACCEPTED).json({
    result: notifications,
    success: "true",
  });
};

module.exports = {
  getAllNotifications,
  getNotification,
  getDoctorNotifications,
  getPatientNotifications,
  addNotification,
  updateNotification,
  confirmNotification,
  deleteNotification,
  deleteDoctorNotifications,
  getNurseNotifications,
};
