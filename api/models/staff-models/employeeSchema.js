const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Roles = require("../../constants/roles");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name"],
      minLength: [
        3,
        "Name length is too short. It must contain at least 3 characters",
      ],
      maxLength: [
        50,
        "Name is too long. It must contain less than 50 characters",
      ],
      validate: {
        validator: (name) => validator.isAlpha(name, ["es-ES"]),
        message: "Name must not contain numbers or any rare characters",
      },
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Invalid email",
      },
      unique: [true, "Email must be unique. {VALUE} already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [
        6,
        "Password is too short. It must contain at least 6 characters.",
      ],
      maxLength: [
        64,
        "Name is too long. It must contain less than 64 characters",
      ],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      unique: true,
      validate: {
        validator: (phone) =>
          validator.isMobilePhone(phone, ["es-MX", "en-US"]),
        message: "Invalid phone number",
      },
    },
    role: {
      type: String,
      required: [true, "Please provide an user role"],
      uppercase: true,
      enum: {
        values: [Roles.ADMIN, Roles.DOCTOR, Roles.NURSE, Roles.RESIDENT],
        message: "Invalid role user: {VALUE}",
      },
    },
    specialty: {
      type: String,
      trim: true,
      maxLength: [50, "Value provided for specialty is too long."],
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.pre("save", async function (next) {
  const newPass = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, newPass);
  next();
});

employeeSchema.pre("save", async function (next) {
  if (this.role !== "DOCTOR") {
    this.specialty = "NONE";
  }
  next();
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
