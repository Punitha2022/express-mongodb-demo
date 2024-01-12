const CustomApiError = require("../error/customApiError");
const Blog = require("../models/blog");
const User = require("../models/user");
const createBlog = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const blog = req.body;
    let author = await User.findOne({ email: user.email });
    blog.author = author;
    console.log(blog);
    const newBlog = await Blog.create(blog);
    res.status(200).json(newBlog);
  } catch (error) {
    console.log(error);
    next(new CustomApiError(error.message, 500));
  }
};
const findBlogsByUser = async (req, res, next) => {
  const user = req.user;
  try {
    const author = await User.findOne({ email: user.email });
    console.log(author);
    const blogs = await Blog.find({ author: author._id });
    res.status(200).json(blogs);
  } catch (error) {
    next(new CustomApiError(error.message, 500));
  }
};
const findAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    next(new CustomApiError(error.message, 500));
  }
};
const updateLikes = async (req, res, next) => {
  const blogLiked = req.body;
  try {
    const blog = Blog.findOne({ _id: blogLiked._id });
    if (blogLiked.isLiked) blog.likes++;
    else blog.likes--;
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blog._id},{ likes: blog.likes },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) { 
    next(new CustomApiError(error.message, 500));  
  }
};
module.exports = { createBlog, findBlogsByUser, findAllBlogs };
