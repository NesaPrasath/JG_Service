const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  console.log("email ", to);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html
  });
};

module.exports = sendMail;