const express = require("express");
const router = express.Router();



router.use((req,res,next)=>{
  fs.appendFile("log.txt",`\n ${Date.now()},${req.ip},${req.path}`,(err,data)=>{
    next();
  })
})

//Routes





router.get("/", async(req, res) => {
  const allDBUsers = await User.find({})
  return res.json(allDBUsers);
  // res.setHeader("X-NAME","Chiku");//custom header, always a good practice to add X- to custom headers.
  
});


//to get info of an id

router.get("/:id", async(req, res) => {
const user = await(User.findById(req.params.id));

if(!user) return res.status(404).json({msg:"No user found"})
 return res.json(user);
});


//to post info

router.post("/", async(req, res) => {
  const body = req.body; //whatever data comes from frontend is stored here
  //status 400
  if(!body ||
     !body.firstName ||
     !body.lastName ||
     !body.gender ||
     !body.email ||
     !body.JobTitle){
    return res.status(400).json({msg:"All fields are mandatory"})
  }
const result = await User.create({
  firstName: body.firstName,
  lastName : body.lastName,
  gender:body.gender,
  emailId: body.email,
  jobTitle:body.JobTitle
  
 })
  
 return res.status(201).json({msg:"success"})

});


//editing using patch

router.patch("/:id", async(req, res) => {

  await User.findByIdAndUpdate(req.params.id,{lastName:req.body.lastName})
  return res.json({ message: "User updated successfully"}) 
  
});


//for deleting user
router.delete("/:id", async(req,res)=>{
  await User.findByIdAndDelete(req.params.id)
  return res.json({msg:"Successss"})
})


module.exports = router;