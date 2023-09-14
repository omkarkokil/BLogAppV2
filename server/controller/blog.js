
const Blog = require("../model/BlogModel");

const createBlog = async (req, res) => {
  try {
    const { title, blog, category, date, userId, name, userPic, blogPic } = req.body;
    if (!title || !category || !blog) {
      return res.json({ msg: "All fields are madatory", status: false });
    }
    if (!blogPic) {
      return res.json({ msg: "image not fetched", status: false });
    }
    const note = await Blog.create({
      title,
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
    const limit = req.query.limit ? parseInt(req.query.limit) : 8;
    const skip = (page - 1) * limit;
    const items = req.query.items
    let blog;

    if (items === 'all') {
      blog = await Blog.find().sort({ _id: -1 }).skip(skip).limit(limit).exec();
    } else {
      blog = await Blog.find({ category: { $in: items } }).sort({ _id: -1 }).skip(skip).limit(limit).exec();
    }
    return res.json(blog);
  } catch (error) {
    console.log(error);
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
    const getBlog = await Blog.find({ userId: req.user.id }).sort({
      _id: -1,
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
    const { title, desc, blog } = req.body;
    const updateBlog = await Blog.findByIdAndUpdate(id, {
      title,
      desc,
      blog,
    });

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

const searchBlogs = async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      {
        $search: {
          index: "serach",
          autocomplete: {
            "query": `${req.query.title}`,
            "path": "title"
          }
        }
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          title: 1,
          blog: 1,
          blogPic: 1,
          createdAt: 1
        }
      }
    ])

    if (!blogs.length) {
      return res.status(202).json({ msg: 'No Blogs.' })
    }
    res.json(blogs)

  } catch (err) {
    return res.status(500).json({ msg: `Error from backend${err.message}` })
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
  searchBlogs
};
