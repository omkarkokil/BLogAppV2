const Comment = require("../model/CommentModel");

const createComment = async (req, res) => {
  try {
    const author = req.user.id;
    const comment = req.body.comment;
    const to = req.params.id;

    const comments = await Comment.create({
      comment: comment,
      author: author,
      to: to,
    });

    if (!comment) {
      return res.json({ status: false, msg: "Fields required" });
    }

    return res.json({
      comments,
      msg: "Comment added successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ to: id })
      .populate("author", "name pic")
      .sort({
        _id: -1,
      })
      .limit(5);

    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const getAllComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.find({ to: id })
      .populate("author", "name pic")
      .sort({
        _id: -1,
      });

    res.json(comment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createComment, getComments, getAllComment };
