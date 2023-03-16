const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GOOGLE_MAIL_ADDRESS,
    pass: process.env.GOOGLE_MAIL_PASSWORD
  },
});

module.exports = { transporter };