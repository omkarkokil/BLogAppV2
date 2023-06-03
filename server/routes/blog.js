const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlog,
  getLastBlog,
  deleteblog,
  getCurrentUserBlog,
  editBlog,
} = require("../controller/blog");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/Auth");

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

router.post("/createBlog", upload.single("blogFile"), createBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlog/:id", getBlog);
router.get("/getLastBlog", auth, getLastBlog);
router.get("/getCurrentUserBlog", auth, getCurrentUserBlog);
router.delete("/deleteBlog/:id", auth, deleteblog);
router.put("/editBlog/:id", upload.single("blogFile"), editBlog);

module.exports = router;
