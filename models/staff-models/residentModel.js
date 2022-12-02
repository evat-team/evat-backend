const mongoose = require("mongoose");
const User = require("./userSchema");

const ResidentSchema = mongoose.Schema({
  user: {
    type: User,
    required: [true, "User data is required"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    enum: {
      values: ["R1", "R2", "R3"],
      message: "{VALUE} is not valid",
    },
  },
});

const ResidentModel = mongoose.model("Resident", ResidentSchema);
module.exports = ResidentModel;
