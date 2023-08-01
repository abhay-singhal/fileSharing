const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");
// const File = require('../models/file');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 100 } }).single(
  "myfile"
); //100mb

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    res.json({ file: `http://localhost:3000/files/${response.uuid}` });
  });
});

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom)
    return res.status(422).send({ error: "All fields are required" });

  const file = await File.findOne({ uuid: uuid });
  if (file.sender) {
    return res.status(422).send({ error: "Email already sent" });

    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    const sendMail = require("../services/emailService");
    sendMail({
      from : emailFrom,
      to: emailTo,
      subject: "InShare",
      text: `${emailFrom} shared a file`,
      html: require('../services/emailTemplate')({
        emailFrom : emailFrom, 
        dowloadlink: `${process.env.APP_URL}/files/${file.uuid}`,
        size: parseInt(file.size/1000)+'KB',
        expired: '24 Hours'
      })
    });
    return res.status(500);
  }
});

module.exports = router;