const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params });
    if(!file){
        return res.render("download", { error: "Link Expired" });
    }
    return res.render('download', {
        uuid: file.uuid,
        fileName  : file.filename,
        fileSize : file.size,
        download: `http://localhost:3000/files/download/${file.uuid}`
        
    })
  } catch (err) {
    return res.render("download", { error: "Something went wrong" });
  }
});

module.exports = router;
