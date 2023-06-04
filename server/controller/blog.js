const express = require("express");
const Blog = require("../model/BlogModel");

const createBlog = async (req, res) => {
  try {
    const { title, desc, blog, category, date, userId, name, userPic, blogPic } = req.body;

    if (!title || !desc || !category || !blog) {
      return res.json({ msg: "All fields are madatory", status: false });
    }

    if (!blogPic) {
      return res.json({ msg: "image not fetched", status: false });
    }


    const note = await Blog.create({
      title,
      desc,
      category,
      blogPic,
      date,
      userId,
      name,
      userPic,
      blog
    });


    return res.json({ note, msg: "Blog created successfully", status: true });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Error to create the blog", status: false });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 9;
    const skip = (page - 1) * size
    const blog = await Blog.find().sort({ _id: -1 }).skip(skip).limit(size);
    return res.json(blog);
  } catch (error) {
    return res.json({ msg: error, status: false });
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const getBlog = await Blog.findById({ _id: id }).sort({ createdAt: -1 });
    return res.json(getBlog);
  } catch (error) {
    console.log(error);
  }
};

// const getLastBlog = async (req, res) => {
//   try {
//     const getBlog = await Blog.findOne({ userId: req.user.id }).sort({
//       _id: -1,
//     });

//     return res.json(getBlog);
//   } catch (error) {
//     return console.log(error);
//   }
// };

const getCurrentUserBlog = async (req, res) => {
  try {
    const getBlog = await Blog.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

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
    const pic = await Blog.find({ _id: id });
    // const blogPIC = req.file.filename;
    const { title, desc, category, blog } = req.body;
    const updateBlog = await Blog.findByIdAndUpdate(id, {
      title,
      desc,
      category,
      blog
    });

    // if (req.file.filename === undefined) {
    //   return res.json({
    //     msg: "All fileds are madatory",
    //     status: false,
    //   });
    // }

    if (category === "") {
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
    return res.json({
      msg: "Some error occured please try again",
      status: false,
    });
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
