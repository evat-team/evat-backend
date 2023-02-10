const mongoose = require("mongoose");
const validator = require("validator");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a name"],
    minLength: [3, "Name is too short. It must contain at least 3 characters"],
    maxLength: [
      50,
      "Name is too long. It must contain less than 50 characters",
    ],
    validate: {
      validator: (name) => validator.isAlpha(name, ["es-ES"]),
      message: "Name must not contain numbers or any rare characters",
    },
  },
  birthDateIso: {
    type: Date,
    required: [true, "Please provide a birth date"],
  },
  palliative: {
    type: String,
    default: "No",
    enum: {
      values: ["Si", "No"],
      message: "{VALUE} is not valid. It must be 'Si' or 'No'",
    },
    required: [true, "Paliative is required"],
  },
  typeOfCancer: {
    type: String,
    required: [true, "Type of cancer is required"],
    maxLength: [500, "Value provided for Type of cancer is too long"],
  },
  services: {
    type: String,
    required: [true, "Name of the service is required"],
    maxLength: [500, "Value provided for Services is too long"],
  },
  idNurse: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "Employee",
  },
});

PatientSchema.set("toObject", { virtuals: true });
PatientSchema.set("toJSON", { virtuals: true });

PatientSchema.virtual("birthDate").get(function () {
  return this.birthDateIso.toISOString().substring(0, 10);
});

const patientModel = mongoose.model("Patient", PatientSchema);

module.exports = patientModel;
