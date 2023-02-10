const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxLength: [50, "Title must contain less than 50 characters"],
      minLength: [3, "Title must contain at least 3 characters"],
      immutable: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [500, "Description must contain less than 500 characters"],
      minLength: [3, "Description must contain at least 3 characters"],
      immutable: true,
    },
    adminAction: {
      type: mongoose.Types.ObjectId,
      required: [true, "ID user must be specified"],
      immutable: true,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

const RecordModel = mongoose.model("Record", recordSchema);

module.exports = RecordModel;
