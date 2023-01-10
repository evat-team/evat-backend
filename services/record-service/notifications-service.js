const { NotificationsModel } = require("../../models");
const { NotFoundError } = require("../../errors");

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
    const results = await NotificationsModel.find({ idPatient });
    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idDoctor
   * @return {Array<NotificationObject>} All documents belong to a doctor
   */
  async returnDoctorNotifications(idDoctor) {
    const results = await NotificationsModel.find({ idDoctor });
    return results;
  }

  /**
   *
   * @param {mongoose.Types.ObjectId} idTransmitter
   * @return {Array<NotificationObject>} All documents belong to a nurse
   */
  async returnNurseNotifications(idTransmitter) {
    const results = await NotificationsModel.find({ idTransmitter });
    return results;
  }

  /**
   *
   * @param {NotificationObject} notification
   * @return {NotificationObject} Notification created in the DB
   */
  async createNotification(notification) {
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
   * @param {boolean} confirm Indicates that the user has seen the notification
   * @returns {NotificationObject} Notification updated
   */
  async notificationConfirmed(id) {
    const result = await NotificationsModel.findByIdAndUpdate(
      id,
      {
        gotIt: true,
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
   * @param {mongoose.Types.ObjectId} idDoctor
   * @returns {Array<NotificationObject>} All notifications deleted
   */
  async deleteAllDoctorNotifications(idDoctor) {
    const results = await NotificationsModel.deleteMany({ idDoctor });
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
