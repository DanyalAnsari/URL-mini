const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  createField,
  createValidatedField,
} = require("../../utils/schemaUtils");
const Validators = require("../validation/mongooseValidators");

const userSchema = new mongoose.Schema(
  {
    Username: createValidatedField(String, Validators.Username, {
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [16, "Username cannot exceed 16 characters"],
    }),
    Email: createValidatedField(String, Validators.Email, {
      unique: true,
      trim: true,
    }),
    Password: createField(String),
    User_Role: createField(String, {
      enum: ["USER", "ADMIN"],
      default: "USER",
      required: false,
    }),
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  try {
    this.Password = await bcrypt.hash(this.Password, 8);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.method("handlePasswordVerification", async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.Password);
});

const User =mongoose.models.users || mongoose.model("users", userSchema);
module.exports = User;
