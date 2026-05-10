const express = require("express");
const router = express.Router();
const { createSession, getSessions,getTodaySession } = require("../controller/SessionConstroller.js");
const auth = require("../middleware/authMiddleware.js");

router.post("/session", auth, createSession);
router.get("/sessions", auth, getSessions);
router.get("/session/today", getTodaySession);

module.exports = router;