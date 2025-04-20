const mongoose = require("mongoose");
const {
  createField,
  createValidatedField,
} = require("../../utils/schemaUtils");
const Validators = require("../validation/mongooseValidators");

const visitSchema = new mongoose.Schema(
  {
    time: createField(Date, { default: Date.now }),
    ipAddress: createValidatedField(String, Validators.IPAddress),
    userAgent: createValidatedField(String, Validators.UserAgent),
  },
  { _id: false }
);

const urlSchema = new mongoose.Schema(
  {
    FullURL: createValidatedField(String, Validators.URL, { trim: true }),
    URLShortId: createField(String, {
      unique: true,
      minlength: [6, "Short ID must be at least 6 characters long"],
      maxlength: [10, "Short ID cannot exceed 10 characters"],
    }),
    UserID: createField(mongoose.Schema.Types.ObjectId, { ref: "User" }),
    Visits: [visitSchema],
  },
  { timestamps: true }
);

const urlModel = mongoose.model("Url", urlSchema);
module.exports = urlModel;
