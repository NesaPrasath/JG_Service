const express = require("express");
const router = express.Router();
const { sendContact } = require("../controller/contactController.js");

router.post("/contact", sendContact);

module.exports = router;