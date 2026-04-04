const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");
const sendMail = require("../middleware/sendMailer");


// ✅ Generate OTP + Send Email
exports.generateOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    const record = await Auth.create({
      email,
      otp,
      expired_on: expiry
    });

    // 📩 Send OTP mail
    await sendMail(
      email,
      "Your Admin OTP",
      `
        <h3>OTP Verification</h3>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP expires in 5 minutes.</p>
      `
    );

    res.json({
      success: true,
      message: "OTP sent to email",
      id: record._id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { id, otp } = req.body;

    const record = await Auth.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expired_on < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ❗ Step 1: Invalidate ALL existing tokens
    await Auth.updateMany(
      { status: "L" },
      { $set: { status: "N" } }
    );

    // ❗ Step 2: Generate new JWT
    const token = jwt.sign(
      { id: record._id, email: record.email },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    const expiry = new Date(Date.now() + 5 * 60 * 60 * 1000); // 5 hours

    // ❗ Step 3: Update current record as LIVE
    record.otp_verified = true;
    record.token = token;
    record.token_expiry = expiry;
    record.status = "L";

    await record.save();

    res.json({
      success: true,
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};