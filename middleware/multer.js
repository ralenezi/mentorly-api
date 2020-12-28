const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    console.log("Something getting uploaded here!");
    const imageName = `${+new Date()}${file.originalname}`;
    if (file) {
      req.body.image = `http://${req.get("host")}/media/${imageName}`;
    }
    cb(null, imageName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
