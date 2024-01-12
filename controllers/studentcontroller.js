const CustomApiError = require("../error/customApiError");
const Student = require("../models/student");
const createStudent = async (req, res) => {
  console.log(req.user);
  try {
    const stu = await Student.create(req.body); //insert a new document into the collection
    res.status(201).json(stu);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const getAllStudents = async (req, res) => {
  try {
    let students = await Student.find();
    students=students.sort((s1,s2)=>
      s1.name.localeCompare(s2.name))
    res.status(200).json(students);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};
const updateStudent = async (req, res,next) => {
  const studentId = req.params.id;
  try {
    console.log(req.body);
    const updatedStud=await Student.findByIdAndUpdate(studentId, req.body,{new:true});
    if(!updatedStud)
      next(new CustomApiError(`cannot be updated..${studentId} doesnt exists.. `,400))
    else
      res.status(200).json(updatedStud);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const findStudentById = async (req, res) => {
  const studentId = req.params.id;
  try {
    const stu = await Student.findById({_id:studentId});
    res.status(200).send(stu);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const deleteStudentById = async (req, res,next) => {
  const studentId = req.params.id;
  try {
    const result = await Student.deleteOne({ _id: studentId });
    if (result.deletedCount === 0)
     next( new CustomApiError(`${studentId} doesnt exists`,400))
    else 
     res.status(200).json({ message: "Deleted Successfully..." });
  } catch (err) {
    console.log(err);
    // res.status(500).json(err.message);
    next( new CustomApiError('ObjectId is not valid',500))
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  updateStudent,
  findStudentById,
  deleteStudentById,
};
