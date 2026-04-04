const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: String,
  otp_verified: { type: Boolean, default: false },
  otp: String,
  token: String,
  token_expiry: Date,
  expired_on: Date, // OTP expiry
  created_on: { type: Date, default: Date.now },
  status: { type: String, default: "L" } // L = Live, N = Not active
});

module.exports = mongoose.model("Auth", authSchema);