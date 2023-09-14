const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlog,
  getLastBlog,
  deleteblog,
  getCurrentUserBlog,
  editBlog,
  searchBlogs
} = require("../controller/blog");
const router = express.Router();
const auth = require("../middleware/Auth");
router.post("/createBlog", createBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/search/blogs", searchBlogs);
router.get("/getBlog/:id", getBlog);
router.get("/getLastBlog", auth, getLastBlog);
router.get("/getCurrentUserBlog", auth, getCurrentUserBlog);
router.delete("/deleteBlog/:id", auth, deleteblog);
router.put("/editBlog/:id", editBlog);

module.exports = router;
