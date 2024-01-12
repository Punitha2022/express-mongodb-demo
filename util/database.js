const mongoose=require('mongoose')

const connectDB=()=>{
    mongoose.set('debug',true)
return mongoose.connect("mongodb://localhost:27017/fsd2demo")
}

module.exports={connectDB}