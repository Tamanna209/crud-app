import User from "../models/userModel.js";

//create api

// export const create=async(req, res)=>{
//     try{

//         const userData=new User(req.body);
//         console.log(userData);

//         if(!userData){
//             return res.status(404).json({msg:'User not found'})
//         }
//         const savedData=await userData.save();
//         res.status(200).json(savedData);

//     } catch( error){
//          res.status(500).json({error: error})
//     }
// }
export const create = async (req, res) => {
    try {
      console.log("Request body:", req.body); // LOG REQUEST BODY
  
      const { fname, lname, email, password } = req.body;
  
      if (!fname || !lname || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ msg: "User already exists" });
      }
  
      const userData = new User(req.body);
      const savedData = await userData.save();
      res.status(201).json({msg:"User Created Successfully"});
  
    } catch (error) {
      console.error("Error in create:", error.message); // LOG ERROR
      res.status(500).json({ error: error.message });
    }
  };
  


export const getAll = async(req, res)=>{
    try{
const userData = await User.find();

if(!userData){
    return res.status(404).json({msg:'Usere data not found'})
}
res.status(200).json(userData);
    }
    catch(err) {

    }
}
export const getOne= async (req, res)=>{
  try{
      const id=req.params.id;
      const userExist=await User.findById(id);

      if(!userExist){
        return res.status(404).json({msg:"User nt found"});
      }
      res.status(200).json(userExist); 
  }
  catch(err){
    return res.status(404).json({msg:"Not found"})
  }
}

export const update=async (req, res)=>{
  try{
    const id=req.params.id;
    console.log(id);
   
    const userExist=await User.findById(id);

    if(!userExist){
      return res.status(404).json({msg:"User not found"});
    }
    const updatedUser=await User.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({msg:"User Updated Successfully"});
  }
  catch(err){
    return res.status(404).json({msg:err})
  }
} 



export const deleteUser = async (req, res)=>{
  try {
      const id=req.params.id;
      const userExist=await User.findById(id);

      if(!userExist){
        return res.status(404).json({msg:"User not found"});
      }
      await User.findByIdAndDelete(id);
      res.status(200).json({msg:"User deleted Succesfully"}); 
  }
  catch(err){
    return res.status(404).json({msg:err})
  }
}