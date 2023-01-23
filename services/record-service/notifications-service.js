const {
  NotificationsModel,
  EmployeeModel,
  PatientModel,
} = require("../../models");
const { NotFoundError, BadRequestError } = require("../../errors");

/**
 * @typedef {Object} NotificationObject
 * @property {String} title
 * @property {String} description
 * @property {mongoose.Types.ObjectId} idTransmitter
 * @property {mongoose.Types.ObjectId} idDoctor
 * @property {mongoose.Types.ObjectId} idPatient
 * @property {Boolean} gotIt
 */

/**
 * @class Provides the functions to interact with the Notifications Collection
 */
class NotificationService {
  /**
   * @return {Array<NotificationObject>} All notifications.
   */
  async returnAllNotifications() {
    const results = await NotificationsModel.find();
    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Notification ID
   * @return {NotificationObject} Notification document
   * @throws {NotFoundError} In case Notification was not found
   */
  async returnSingleNotification(id) {
    const result = await NotificationsModel.findById(id);

    if (!result) {
      throw new NotFoundError("Notification not found");
    }

    return result;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idPatient
   * @return {Array<NotificationObject>} All documents belong to a single patient
   */
  async returnPatientNotifications(idPatient) {
    if (!idPatient) {
      throw new BadRequestError("Please provide a patient id");
    }

    const patient = await PatientModel.findById(idPatient);

    if (!patient) {
      throw new NotFoundError("Patient was not found");
    }

    const results = await NotificationsModel.find({ idPatient });
    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idDoctor
   * @return {Array<NotificationObject>} All documents belong to a doctor
   */
  async returnDoctorNotifications(idDoctor) {
    if (!idDoctor) {
      throw new BadRequestError("Please provide a Doctor ID");
    }

    const employee = await EmployeeModel.findById(idDoctor);

    if (!employee) {
      throw new NotFoundError("Employee was not found");
    }

    if (employee.role !== "DOCTOR" || employee.role !== "RESIDENT") {
      throw new BadRequestError("Employee is not a doctor or resident");
    }

    const results = await NotificationsModel.find({ idDoctor });
    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idDoctor
   * @return {Array<NotificationObject>} All notifications matched to a doctor id
   */
  async returnAllNewDoctorNotifications(idDoctor) {
    if (!idDoctor) {
      throw new BadRequestError("Please provide a Doctor ID");
    }

    const employee = await EmployeeModel.findById(idDoctor);

    if (!employee) {
      throw new NotFoundError("Employee was not found");
    }

    if (employee.role !== "DOCTOR" || employee.role !== "RESIDENT") {
      throw new BadRequestError("Employee is not a doctor or resident");
    }

    const results = await NotificationsModel.find({ idDoctor, gotIt: false });
    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idTransmitter
   * @return {Array<NotificationObject>} All documents belong to a nurse
   */
  async returnNurseNotifications(idTransmitter) {
    if (!idTransmitter) {
      throw new BadRequestError("Please provide a Nurse Id");
    }

    const employee = await EmployeeModel.findById(idTransmitter);

    if (!employee) {
      throw new NotFoundError("Employee was not found");
    }

    const results = await NotificationsModel.find({ idTransmitter });
    return results;
  }

  /**
   *
   * @param {NotificationObject} notification
   * @return {NotificationObject} Notification created in the DB
   */
  async createNotification(notification) {
    const nurse = await EmployeeModel.findById(idTransmitter);

    if (!nurse) {
      throw new NotFoundError("Nurse was not found");
    }

    if (nurse.role !== "NURSE") {
      throw new BadRequestError("This employee is not a nurse");
    }

    const doctor = await EmployeeModel.findById(idTransmitter);

    if (!doctor) {
      throw new NotFoundError("Doctor was not found");
    }

    if (doctor.role !== "DOCTOR" || doctor.role !== "RESIDENT") {
      throw new BadRequestError("This employee is not a doctor or resident");
    }

    const patient = await PatientModel.findById(patient);

    if (!patient) {
      throw new NotFoundError("Patient was not found");
    }

    const result = await NotificationsModel.create({
      title: notification.title,
      description: notification.description,
      idTransmitter: notification.idTransmitter,
      idDoctor: notification.idDoctor,
      idPatient: notification.idPatient,
    });

    return result;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Notification ID
   * @param {Object} notificationInfo
   * @returns {NotificationObject} Notification updated
   */
  async updateNotification(id, notificationInfo) {
    const result = await NotificationsModel.findByIdAndUpdate(
      id,
      {
        title: notificationInfo.title,
        description: notificationInfo.description,
        idNurse: notificationInfo.idNurse,
        idDoctor: notificationInfo.idDoctor,
        idPatient: notificationInfo.idPatient,
      },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new NotFoundError("Notification was not found");
    }

    return result;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Notification ID
   * @param {boolean} confirmed Indicates that the user has seen or not the notification
   * @returns {NotificationObject} Notification updated
   */
  async notificationConfirmed(id, confirmed) {
    const result = await NotificationsModel.findByIdAndUpdate(
      id,
      {
        gotIt: confirmed,
      },
      { new: true }
    );

    if (!result) {
      throw new NotFoundError("Notification was not found");
    }

    return result;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idTransmitter
   * @returns {Array<NotificationObject>} All notifications deleted
   */
  async deleteAllNurseNotifications(idTransmitter) {
    if (!idTransmitter) {
      throw new BadRequestError("Please provide an ID transmitter");
    }

    const employee = await EmployeeModel.findById(idTransmitter);

    if (!employee) {
      throw new NotFoundError("Employee was not found");
    }

    const results = await NotificationsModel.deleteMany({ idTransmitter });

    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} id Notification ID
   * @return {NotificationObject} Notification deleted
   */
  async deleteSingleNotification(id) {
    const result = await NotificationsModel.findByIdAndRemove(id);

    if (!result) {
      throw new NotFoundError("Notification was not found");
    }

    return result;
  }
}

module.exports = new NotificationService();
