const express = require("express");
const Blog = require("../model/BlogModel");

const createBlog = async (req, res) => {
  try {
    const { title, desc, category, date, userId, name, userPic } = req.body;
    const blogPic = req.file ? req.file.filename : null;
    const note = await Blog.create({
      title,
      desc,
      category,
      blogPic,
      date,
      userId,
      name,
      userPic,
    });

    if ((!title, !desc, !category)) {
      return res.json({ msg: "All fields are madatory", status: false });
    }

    if (!blogPic) {
      return res.json({ msg: "image not fetched", status: false });
    }
    return res.json({ note, msg: "Blog created successfully", status: true });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Error to create the blog", status: false });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find().sort({ _id: -1 });
    return res.json(blog);
  } catch (error) {
    return res.json({ msg: error, status: false });
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const getBlog = await Blog.findById({ _id: id });
    return res.json(getBlog);
  } catch (error) {
    console.log(error);
  }
};

const getLastBlog = async (req, res) => {
  try {
    const getBlog = await Blog.findOne({ userId: req.user.id }).sort({
      _id: -1,
    });

    return res.json(getBlog);
  } catch (error) {
    return console.log(error);
  }
};

const getCurrentUserBlog = async (req, res) => {
  try {
    const getBlog = await Blog.find({ userId: req.user.id })
      .sort({
        _id: -1,
      })
      .skip(1);
    // Bloglength = getBlog.length;
    return res.json(getBlog);
  } catch (error) {
    console.log(error);
  }
};

const deleteblog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete({ _id: id });
    return res.json({
      msg: "Blog deleted successfully",
      status: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "404 error occured please try again",
      status: false,
    });
  }
};

async function editBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, desc, category } = req.body;
    const updateBlog = await Blog.findByIdAndUpdate(id, {
      title,
      desc,
      category,
    });

    if ((!title, !desc)) {
      return res.json({
        msg: "All fileds are madatory",
        status: false,
      });
    }

    return res.json({
      msg: "Blog updated successfully",
      status: true,
      updateBlog,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlog,
  getLastBlog,
  getCurrentUserBlog,
  deleteblog,
  editBlog,
};
