const mongoose = require("mongoose");
const User = require("./userSchema");

const NurseSchema = mongoose.Schema({
  user: {
    type: User,
    required: [true, "User data is required"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    enum: ["R1", "R2", "R3"],
  },
  patientsID: [mongoose.Types.ObjectId],
});

const nurseModel = mongoose.model("Nurse", NurseSchema);

module.exports = nurseModel;
