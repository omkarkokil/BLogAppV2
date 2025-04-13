const mongoose = require("mongoose");
const User = require("../model/userModel");

const CommentSchema = mongoose.Schema(
  {
    comment: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comments", CommentSchema);

module.exports = CommentModel;
