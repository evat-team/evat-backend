const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ResidentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minLength: [3, "name is too short"],
  },
  idWorker: {
    type: String,
    required: [true, "ID is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [3, "password is too short"],
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  position: {
    type: String,
    required: [true, "position is required"],
    enum: ["Residente R!", "Residente R2", "Residente R3"],
  },
});

ResidentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const ResidentModel = mongoose.model("Resident", ResidentSchema);
module.exports = ResidentModel;
