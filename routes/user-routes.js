const express=require('express');
const {login,register} = require('../controllers/usercontroller');
const router=express.Router();
//added a comment
router.post('/login',login)
router.post('/register',register)

module.exports=router