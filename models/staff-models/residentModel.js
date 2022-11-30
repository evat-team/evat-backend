const mongoose = require("mongoose");
const User = require("./userSchema");

const ResidentSchema = mongoose.Schema({
  user: {
    type: User,
    required: true,
  },
  position: {
    type: String,
    required: [true, "position is required"],
    enum: ["Residente R!", "Residente R2", "Residente R3"],
  },
});

const ResidentModel = mongoose.model("Resident", ResidentSchema);
module.exports = ResidentModel;
