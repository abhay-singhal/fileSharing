const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/file");

async function sendMail({ from, to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: "singhalabhay19@gmail.com",
      pass: "RGX8QW4JNSIgrzCT",
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
