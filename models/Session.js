const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  meeting_period: Date,
  meeting_name: String,
  meeting_link: String,
  created_on: { type: Date, default: Date.now },
  status: { type: String, default: "A" }
});

module.exports = mongoose.model("Session", sessionSchema);