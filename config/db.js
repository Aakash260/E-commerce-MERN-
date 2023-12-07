 import mongoose from "mongoose";
 const Db = async() => {
 
  try {
    const con=await mongoose.connect(process.env.MONGODB)
    console.log('connected to db')
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
 }
 
 export default Db