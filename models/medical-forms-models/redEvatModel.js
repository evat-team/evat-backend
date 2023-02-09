const mongoose = require("mongoose");

const redEvatSchema = new mongoose.Schema(
  {
    /* first Red Evat */

    month: {
      type: String,
      required: [true, "Month is required"],
      enum: {
        values: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        message:
          "Value provided for Month is invalid. Please provide a correct month",
      },
    },
    firstEvatDate: {
      type: Date,
      required: [true, "First evat date must be specified"],
    },
    firstEvatHour: {
      type: Number,
      required: [true, "First hour Evat is required"],
      min: [
        0,
        "Value provided for First Evat hour is too low. It must be between [0 - 23]",
      ],
      max: [
        23,
        "Value provided for First Evat hour is too high. It must be between [0 - 23]",
      ],
      get: (hour) => `${hour}:00`,
    },
    /* Components evat registered */

    CN: {
      type: Number,
      required: [true, "CN is required"],
      min: [0, "Value provided for CN is too low"],
      max: [500, "Value provided for CN is too high"],
    },
    CV: {
      type: Number,
      required: [true, "CV is required"],
      min: [0, "Value provided for CV is too low"],
      max: [500, "Value provided for CV is too high"],
    },
    R: {
      type: Number,
      required: [true, "R is required"],
      min: [0, "Value provided for R is too low"],
      max: [500, "Value provided for R is too high"],
    },
    PE: {
      type: Number,
      required: [true, "PE is required"],
      min: [0, "Value provided for PE is too low"],
      max: [1000, "Value provided for PE is too high"],
    },
    PF: {
      type: Number,
      required: [true, "PF is required"],
      min: [0, "Value provided for PF is too low"],
      max: [500, "Value provided for PF is too high"],
    },

    /* Medical Response */

    consultUCI: {
      type: String,
      default: "No",
      required: [true, "Consult UCI is required"],
      enum: {
        values: ["Si", "No"],
        message:
          "Value provided for UCI consult is not valid. It must be 'Si' or 'No'",
      },
    },
    consultHour: {
      type: Number,
      required: [true, "Consult hour must be specified"],
      min: [
        0,
        "Value provided for consult hour is too low. It must be between [0 - 23]",
      ],
      max: [
        23,
        "Value provided for consult hour is too high. It must be between [0 - 23]",
      ],
      get: (hour) => `${hour}:00`,
    },
    intervention: {
      type: String,
      required: [true, "Type of intervention must be specified"],
      enum: {
        values: ["UCI", "Pedi"],
        message:
          "Value provided for Intervention is not valid. It must be 'UCI' or 'Pedi'",
      },
    },
    interventionHour: {
      type: Number,
      required: [true, "Intervention hour is required"],
      min: [
        0,
        "Value provided for Intervention hour is too low. It must be between [0 - 23]",
      ],
      max: [
        24,
        "Value provided is for Intervention hour too high. It must be between [0 - 23]",
      ],
      get: (hour) => `${hour}:00`,
    },

    interventionType: {
      type: String,
      maxLength: [500, "Value Provided for Intervention type is too long"],
    },

    evatDuration: {
      type: Number,
      min: [0, "Value provided for Evat Duration is too low"],
      max: [500, "Value provided for Evat Duration is too high"],
      get: (hour) => `${hour}:00`,
    },

    /* patient's tracking */

    deteriorationEvent: {
      type: String,
      required: [true, "Deterioration event is required"],
      default: "No",
      enum: {
        values: ["Si", "No"],
        message:
          "Value provided for Deterioration event is not valid. It must be 'Si' or 'No'",
      },
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      maxLength: [100, "Value Provided for Event type is too long"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event Date is required"],
    },
    eventHour: {
      type: Number,
      required: [true, "Event hour is required"],
      min: [
        0,
        "Value provided for Event hour is too low. It must be between [0 - 23]",
      ],
      max: [
        24,
        "Value provided for Event hour is too high. It must be between [0 - 23]",
      ],
      get: (hour) => `${hour}:00`,
    },
    translate: {
      type: String,
      required: [true, "Translate is required"],
      default: "No",
      enum: {
        values: ["Si", "No"],
        message:
          "Value provided for translate is not valid. It must be 'Si' or 'No'",
      },
    },
    translateDate: {
      type: Date,
      required: [true, "Translate date is required"],
    },
    translateHour: {
      type: Number,
      required: [true, "Translate hour is required"],
      min: [
        0,
        "Value provided for Translate hour is too low. It must be between [0 - 23]",
      ],
      max: [
        23,
        "Value provided for Translate hour is too high. It must be between [0 - 23]",
      ],
    },
    residence: {
      type: Number,
      required: [true, "Residence is required"],
      min: [0, "Value provided for Residence is too low."],
      max: [2000, "Value provided for Residence is too high."],
    },
    mortality: {
      type: String,
      default: "No",
      required: [true, "Mortality is required"],
      enum: {
        values: ["Si", "No"],
        message:
          "Value provided for Mortality is not valid. It must be 'Si' or 'No'",
      },
    },
    comment: {
      type: String,
      maxLength: [1000, "Comment provided is too long"],
    },
    idPatient: {
      type: mongoose.Types.ObjectId,
      required: [
        true,
        "Daily form must contain an identifier from the patient",
      ],
      ref: "Patient",
    },
  },
  { timestamps: true }
);

const RedEvatModel = mongoose.model("RedEvat", redEvatSchema);

module.exports = RedEvatModel;
