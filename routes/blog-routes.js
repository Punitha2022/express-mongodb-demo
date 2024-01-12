const express=require('express')
const {createBlog,findAllBlogs, findBlogsByUser} = require('../controllers/blogcontroller');
const authMiddleware = require('../middleware/auth');
const routes=express.Router()

routes.post('/',authMiddleware,createBlog)
routes.get('/',authMiddleware,findAllBlogs)
routes.get('/user',authMiddleware,findBlogsByUser)
module.exports=routes;