
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
  },
});

const patientModel = mongoose.model("patient", PatientSchema);

module.exports = patientModel;

