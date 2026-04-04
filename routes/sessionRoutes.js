const express = require("express");
const router = express.Router();
const { createSession, getSessions } = require("../controllers/sessionController");
const auth = require("../middleware/authMiddleware");

router.post("/session", auth, createSession);
router.get("/sessions", auth, getSessions);
router.get("/session/today", getTodaySession);

module.exports = router;