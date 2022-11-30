const mongoose = require("mongoose");
const User = require("./userSchema");

const doctorSchema = mongoose.Schema({
  user: {
    type: User,
    required: true,
  },
  specialty: {
    type: String,
    required: [true, "Speciality is required"],
  },
});

const doctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = doctorModel;
