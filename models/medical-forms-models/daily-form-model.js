const mongoose = require("mongoose");

const dailySchema = mongoose.Schema(
  {
    hour: {
      type: Number,
      required: [true, "Hour must be specified"],
      min: ["{VALUE} is too low. it must be between [0 - 24]"],
      max: ["{VALUE} is too high. it must be between [0 - 24]"],
    },
    shift: {
      type: String,
      enum: {
        values: ["TM", "TV", "TN"],
        message: "{VALUE} is not a valid value",
      },
    },
    temperature: {
      type: Number,
      required: [true, "Temperature is required"],
      enum: {
        values: [39.5, 39, 38.5, 38, 37.5, 37, 36.5, 36, 35.5, 35],
        message: "{VALUE} is invalid",
      },
    },
    bloodPressure: {
      type: Number,
      required: [true, "Blood pressure is required"],
    },
    FC: {
      type: Number,
      required: [true, "FC is required"],
    },
    FR: {
      type: Number,
      required: [true, "FR is required"],
    },
    SO2: {
      type: Number,
      required: [true, "SO2 is required"],
    },
    ltsO2: {
      type: Number,
      required: [true, "lts of O2 is required"],
    },
    pain: {
      type: Number,
      required: [true, "Pain is required"],
    },
    capillaryRefill: {
      type: Number,
      required: [true, "capillary refill is required"],
    },
    rightPupil: {
      type: String,
      default: "R",
      enum: {
        values: ["R", "NR"],
        message: "{VALUE} is not valid",
      },
    },
    leftPupil: {
      type: String,
      default: "R",
      enum: {
        values: ["R", "NR"],
        message: "{VALUE} is not valid",
      },
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
