const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  customer_name: String,
  email_id: String,
  mobile_number: String,
  message: String,
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model("contactSchema", contactSchema);