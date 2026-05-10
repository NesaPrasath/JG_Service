const express = require("express");
const router = express.Router();
const { sendContact } = require("../controllers/contactController.js");

router.post("/contact", sendContact);

module.exports = router;