const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title of notification is required"],
      maxLength: [50, "Title must contain less than 50 characters"],
      minLength: [3, "Title must contain more than 3 characters"],
    },
    description: {
      type: String,
      maxLength: [500, "Description must contain less than 500 characters"],
    },
    idTransmitter: {
      type: mongoose.Types.ObjectId,
      required: [true, "ID of transmitter is required"],
      ref: "Employee",
    },
    idDoctor: {
      type: mongoose.Types.ObjectId,
      required: [true, "ID of Doctor is required"],
      ref: "Employee",
    },
    idPatient: {
      type: mongoose.Types.ObjectId,
      required: [true, "ID of Patient is required"],
      ref: "Patient",
    },
    gotIt: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationsModel = mongoose.model("Notification", notificationsSchema);

module.exports = NotificationsModel;
