const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
  adminAction: {
    type: mongoose.Types.ObjectId,
    required: [true, "ID user must be specified"],
    immutable: true,
  },
  dateAction: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const RecordModel = mongoose.model("Record", recordSchema);

module.exports = RecordModel;
