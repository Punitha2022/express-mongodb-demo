const mongoose=require('mongoose')
const StudentSchema=new mongoose.Schema({
    "name":String,
    "age":Number
})
//student refers to single student document name
//collection name -> students
//document name -> student
//structure -> {name:'..',age:20}
module.exports=mongoose.model('student',StudentSchema)