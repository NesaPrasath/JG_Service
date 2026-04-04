const ClientMessage = require("../models/ContactUs");
const nodemailer = require("nodemailer");

exports.sendContact = async (req, res) => {
  try {
    const { name, email, phonenumber, message } = req.body;

    const newMsg = await ClientMessage.create({
      customer_name: name,
      email_id: email,
      mobile_number: phonenumber,
      message
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Message",
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phonenumber}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};