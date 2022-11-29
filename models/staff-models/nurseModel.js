const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const NurseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [3, "Name is too short"],
  },
  idWorker: {
    type: String,
    required: [true, "id Worker is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: 3,
  },
  phone: {
    type: Number,
    required: [true, "Age is required"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    enum: ["R1", "R2", "R3"],
  },
});

NurseSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const nurseModel = mongoose.model("nurse", NurseSchema);

module.exports = nurseModel;
