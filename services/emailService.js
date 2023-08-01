const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/file");

async function sendMail({ from, to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `inShare <${from}`,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
}

module.exports = sendMail;
