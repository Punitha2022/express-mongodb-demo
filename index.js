const express=require('express')
const cors=require('cors')
const {connectDB}=require('./util/database');
const studentRouter=require('./routes/student-routes')
const bookRouter=require('./routes/book-routes');
const userRouter=require('./routes/user-routes');
const blogRouter=require('./routes/blog-routes')
const errorHandler = require('./error/error-handler');
require('dotenv').config()
const app=express();
app.use(express.json())
app.use(cors())

app.use('/student',studentRouter)
app.use('/book',bookRouter)
app.use('/user',userRouter)
app.use('/blog',blogRouter);
app.use(errorHandler)
const start=async ()=>{
  try{
    const connect=await connectDB();
   // console.log(connect)
    app.listen(8081,()=>{
        console.log('server listening at port number 8081')
    })
  }catch(err){
    console.log(err)
  }
}
start()



