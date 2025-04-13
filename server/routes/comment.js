const express = require("express");
const auth = require("../middleware/Auth");
const {
  createComment,
  getComments,
  getAllComment,
} = require("../controller/comment");

const router = express.Router();

router.post("/comment/:id", auth, createComment);
router.get("/getAllComment/:id", getAllComment);
router.get("/getcomment/:id", getComments);

module.exports = router;
