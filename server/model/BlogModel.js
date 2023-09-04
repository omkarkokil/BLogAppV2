const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    required: true,
  },
  blogPic: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userPic: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = BlogModel;
