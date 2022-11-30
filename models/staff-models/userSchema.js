const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name length is too short"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Invalid email",
      },
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password is too short"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      validate: {
        validator: (phone) => validator.isMobilePhone(phone, "es-MX"),
        message: "Invalid phone number",
      },
    },
    role: {
      type: String,
      required: true,
      uppercase: true,
      enum: {
        values: ["ADMIN", "NURSE", "DOCTOR", "RESIDENT"],
        message: "Invalid role user: {VALUE}",
      },
    },
  },
  {
    _id: false,
  }
);

userSchema.pre("save", async function (next) {
  const newPass = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, newPass);
  next();
});

module.exports = userSchema;
