const mongoose = require("mongoose");

const dailySchema = new mongoose.Schema(
  {
    hour: {
      type: Number,
      required: [true, "Hour must be specified"],
      min: [
        0,
        "Value provided for Hour is too low. It must be between [0 - 23]",
      ],
      max: [
        23,
        "Value provided for Hour is too high. It must be between [0 - 23]",
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
      required: [true, "Lts of O2 is required"],
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
    neuro: {
      type: Number,
      required: [true, "Neurological value is required"],
      min: [0, "Value provided for Evat Neurological is too low"],
      max: [3, "Value provided for Evat Neurological is too high"],
    },
    cardio: {
      type: Number,
      required: [true, "Cardiological value is required"],
      min: [0, "Value provided for Evat Cardio is too low"],
      max: [3, "Value provided for Evat Cardio is too high"],
    },
    resp: {
      type: Number,
      required: [true, "Respiratory value is required"],
      min: [0, "Value provided for Evat Respiratory is too low"],
      max: [3, "Value provided for Evat Respiratory is too high"],
    },
    nurseConcern: {
      type: Number,
      required: [true, "Nurse concern is required"],
      min: [0, "Value provided for Evat Nurse Concern is too low"],
      max: [3, "Value provided for Evat Nurse Concern is too high"],
    },
    familyConcern: {
      type: Number,
      required: [true, "Family concern is required"],
      min: [0, "Value provided for Evat Family Concern is too low"],
      max: [3, "Value provided for Evat Family Concern is too high"],
    },
    evatResult: {
      type: Number,
      min: [0, "Value for Evat result is too low"],
      max: [3, "Value for Evat result is too high"],
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

dailySchema.set("toObject", { virtuals: true });
dailySchema.set("toJSON", { virtuals: true });

dailySchema.virtual("createdAtFormat").get(function () {
  return this.createdAt.toISOString().substring(0, 10);
});

dailySchema.virtual("updatedAtFormat").get(function () {
  return this.updatedAt.toISOString().substring(0, 10);
});

dailySchema.pre("save", function (next) {
  switch (true) {
    case this.hour >= 8 && this.hour <= 14:
      this.shift = "TM";
      break;
    case this.hour >= 15 && this.hour <= 21:
      this.shift = "TV";
      break;
    case this.hour >= 22 || this.hour <= 7:
      this.shift = "TN";
      break;
    default:
      break;
  }
  next();
});

dailySchema.pre("save", function (next) {
  this.evatResult = Math.max(
    this.cardio,
    this.neuro,
    this.resp,
    this.familyConcern,
    this.nurseConcern
  );
  next();
});

const DailyFormModel = mongoose.model("DailyForm", dailySchema);

module.exports = DailyFormModel;
