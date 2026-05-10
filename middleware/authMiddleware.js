const jwt = require("jsonwebtoken");
const Auth = require("../models/Authenticate.js");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Check token in DB
    const authRecord = await Auth.findOne({
      token: token,
      status: "L"
    });

    if (!authRecord) {
      return res.status(401).json({ message: "Token not active" });
    }

    // ⏳ Check expiry
    if (authRecord.token_expiry < new Date()) {
      authRecord.status = "N";
      await authRecord.save();

      return res.status(401).json({ message: "Token expired" });
    }

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};