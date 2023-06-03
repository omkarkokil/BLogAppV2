const express = require("express");
const { RegisterUser, loginUser } = require("../controller/user");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "https://magicalwinds.onrender.com/public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/registeruser", upload.single("myFile"), RegisterUser);
console.log("registeruser");
router.post("/loginUser", loginUser);

module.exports = router;
