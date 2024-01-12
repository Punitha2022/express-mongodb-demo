const Book=require('../models/book')
const createBook=async (req,res)=>{
  try{
      const bk=await Book.create(req.body)
      res.status(201).json(bk)
  }catch(err){
      res.status(500).json({err})
  }
}
module.exports={createBook}