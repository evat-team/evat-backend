const mongoose = require("mongoose");

const dailySchema = mongoose.Schema(
  {
    hour: {
      type: Number,
      required: [true, "Hour must be specified"],
      min: [
        0,
        "Value provided for Hour is too low. it must be between [0 - 24]",
      ],
      max: [
        24,
        "Value provided for Hour is too high. it must be between [0 - 24]",
      ],
    },
    shift: {
      type: String,
      enum: {
        values: ["TM", "TV", "TN"],
        message:
          "Value provided for shift is not valid. It must be one of the next values [TM, TV, TN]",
      },
    },
    temperature: {
      type: String,
      required: [true, "Temperature is required"],
      enum: {
        values: [
          "39.5>",
          "39.5",
          "39",
          "38.5",
          "38",
          "37.5",
          "37",
          "36.5",
          "36",
          "35.5",
          "35",
        ],
        message:
          "Temperature provided is invalid. Temperature must be between [ 39.5-35 ]",
      },
    },
    bloodPressure: {
      type: Number,
      required: [true, "Blood pressure is required"],
      min: [0, "Value provided for Blood pressure is too low"],
      max: [500, "Value provided for Blood pressure is too high"],
    },
    FC: {
      type: Number,
      required: [true, "FC is required"],
      min: [0, "Value provided for FC is too low"],
      max: [500, "Value provided for FC is too high"],
    },
    FR: {
      type: Number,
      required: [true, "FR is required"],
      min: [0, "Value provided for FR is too low"],
      max: [500, "Value provided for FR is too high"],
    },
    SO2: {
      type: Number,
      required: [true, "SO2 is required"],
      min: [0, "Value provided for SO2 is too low"],
      max: [500, "Value provided for SO2 is too high"],
    },
    ltsO2: {
      type: Number,
      required: [true, "lts of O2 is required"],
      min: [0, "Value provided for Lts O2 is too low"],
      max: [500, "Value provided for Lts O2 is too high"],
    },
    pain: {
      type: Number,
      required: [true, "Pain is required"],
      min: [0, "Value provided for Pain is too low"],
      max: [500, "Value provided for Pain is too high"],
    },
    capillaryRefill: {
      type: Number,
      required: [true, "Capillary refill is required"],
      min: [0, "Value provided for Capillary refill is too low"],
      max: [500, "Value provided for Capillary refill is too high"],
    },
    rightPupil: {
      type: String,
      default: "R",
      enum: {
        values: ["R", "NR"],
        message:
          "Value provided for Right pupil is not valid. It must be 'R' or 'NR'",
      },
    },
    leftPupil: {
      type: String,
      default: "R",
      enum: {
        values: ["R", "NR"],
        message:
          "Value provided for Left pupil is not valid. It must be 'R' or 'NR'",
      },
    },
    idPatient: {
      type: mongoose.Types.ObjectId,
      required: [
        true,
        "Daily form must contain an identifier from the patient",
      ],
    },
  },
  { timestamps: true }
);

dailySchema.pre("save", function (next) {
  switch (true) {
    case this.hour >= 8 && this.hour <= 14:
      this.shift = "TM";
      break;
    case this.hour >= 15 && this.hour <= 21:
      this.shift = "TV";
      break;
    case this.hour >= 22 && this.hour <= 7:
      this.shift = "TN";
      break;
    default:
      break;
  }
  next();
});

const DailyFormModel = mongoose.model("DailyForm", dailySchema);

module.exports = DailyFormModel;
