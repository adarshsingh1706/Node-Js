const User = require("../models/user");

async function handleAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "No user found" });
  return res.json(user);
}

async function handleUpdateUserById(req,res){
  await User.findByIdAndUpdate(req.params.id,{lastName:req.body.lastName})
  return res.json({ message: "User updated successfully"}) 
}

async function handleDeleteUserById(req,res){
  await User.findByIdAndDelete(req.params.id)
  return res.json({msg:"Successss"})
}

async function handleCreateNewUser(req,res){
  const body = req.body; //whatever data comes from frontend is stored here
  //status 400
  if(!body ||
     !body.firstName ||
     !body.lastName ||
     !body.gender ||
     !body.email ||
     !body.JobTitle){
      console.log(req.body);
    return res.status(400).json({msg:"All fields are mandatory"})
    
  }
const result = await User.create({
  firstName: body.firstName,
  lastName : body.lastName,
  gender:body.gender,
  emailId: body.email,
  jobTitle:body.JobTitle
})
  
return res.status(201).json({msg:"success" , id:result._id })
}



module.exports = {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser
};
