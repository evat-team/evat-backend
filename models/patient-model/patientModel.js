const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [3, "Name is too short"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    max: [100, "Age is too high"],
    min: [0, "Age is too low"],
  },
  palliative: {
    type: String,
    default: "No",
    enum: {
      values: ["Si", "No"],
      message: "{VALUE} is not valid",
    },
    required: [true, "Paliative is required"],
  },
  typeOfCancer: {
    type: String,
    required: [true, "Type of cancer is required"],
  },
  services: {
    type: String,
    required: [true, "Name of the service is required"],
  },
  medicalDailyForm: [mongoose.Types.ObjectId],
  redEvat: [mongoose.Types.ObjectId],
});

const patientModel = mongoose.model("Patient", PatientSchema);

module.exports = patientModel;
