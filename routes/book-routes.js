const express=require('express')
const { createBook } = require('../controllers/bookcontroller');
const authMiddleware = require('../middleware/auth');
const routes=express.Router()

routes.post('/',createBook)

module.exports=routes;