const mongoose = require("mongoose");

const redEvatSchema = mongoose.Schema(
  {
    /* first Red Evat */

    month: {
      type: String,
      required: [true, "month is required"],
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
        message: "{VALUE} is not valid",
      },
    },
    firstEvatDate: {
      type: Date,
      required: [true, "First evat date must be specified"],
    },
    firstEvatHour: {
      type: Number,
      required: [true, "First hour Evat is required"],
      min: [0, "{VALUE} is too low. it must be between [0 - 24]"],
      maxn: [24, "{VALUE} is too high. it must be between [0 - 24]"],
    },

    /* Components evat registered */

    CN: {
      type: Number,
      required: [true, "CN is required"],
      min: [0, "{VALUE} is too low"],
    },
    CV: {
      type: Number,
      required: [true, "CV is required"],
      min: [0, "{VALUE} is too low"],
    },
    R: {
      type: Number,
      required: [true, "R is required"],
      min: [0, "{VALUE} is too low"],
    },
    PE: {
      type: Number,
      required: [true, "PE is required"],
      min: [0, "{VALUE} is too low"],
    },
    PF: {
      type: Number,
      required: [true, "PF is required"],
      min: [0, "{VALUE} is too low"],
    },

    /* Medical Response */

    consultUCI: {
      type: String,
      default: "No",
      required: [true, "consulta UCI is required"],
      enum: {
        values: ["Si", "No"],
        message: "{VALUE} is not valid",
      },
    },
    consultHour: {
      type: Number,
      required: [true, "Consult hour must be specified"],
      min: [0, "{VALUE} is too low. it must be between [0 - 24]"],
      max: [24, "{VALUE} is too high. it must be between [0 - 24]"],
    },
    intervention: {
      type: String,
      required: [true, "Type of intervention must be specified"],
      enum: {
        values: ["UCI", "Pedi"],
        message: "{VALUE} is not valid",
      },
    },
    interventionHour: {
      type: Number,
      required: [true, "Intervention hour is required"],
      min: [0, "{VALUE} is too low. it must be between [0 - 24]"],
      max: [24, "{VALUE} is too high. it must be between [0 - 24]"],
    },
    interventionType: { type: String },
    evatDuration: { type: Number },

    /* patient's tracking */

    deteriorationEvent: {
      type: String,
      required: [true, "Deterioration event is required"],
      default: "NO",
      uppercase: true,
      enum: {
        values: ["SI", "NO"],
        message: "{VALUE is not valid}",
      },
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event Date is required"],
    },
    eventHour: {
      type: String,
      required: [true, "Event hour is required"],
    },
    traslate: {
      type: String,
      required: [true, "Traslate is required"],
      default: "NO",
      uppercase: true,
      enum: {
        values: ["SI", "NO"],
        message: "{VALUE is not valid}",
      },
    },
    traslateDate: {
      type: Date,
      required: [true, "traslate date id required"],
    },
    traslateHour: {
      type: String,
      required: [true, "traslate hour is required"],
    },
    residence: {
      type: Number,
      required: [true, "Residence is required"],
    },
    mortality: {
      type: String,
      default: "NO",
      required: [true, "Traslate is required"],
      uppercase: true,
      enum: {
        values: ["SI", "NO"],
        message: "{VALUE is not valid}",
      },
    },
    comment: String,
  },
  { timestamps: true }
);

const RedEvatModel = mongoose.model("RedEvat", redEvatSchema);

module.exports = RedEvatModel;
