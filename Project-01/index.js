const express = require("express");
const app = express();
const mongoose = require('mongoose');
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const { create } = require("domain");
const PORT = 8000;

//connect

mongoose.connect('mongodb://127.0.0.1:27017/db1') //returns a promise
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("Error in connection", err))




//Schema

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    required:true,
    unique:true
  },
  jobTitle:{
    type:String
  },
  gender:{
    type:String,
    required:true
  }

},
 {timestamps:true} // shows in db when created, updated
)
 
//model

const User = mongoose.model("user",userSchema);





//middleware:plugin
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
console.log("Hello from Middleware 1")
// return res.json({msg:"Hello from Middleware 1"}) //here only i stopped the req & sended back the response so user cannot access below statements.

//now if suppose i want to call the next fn so i will just call next();

next();
//we can also make changes to the req res objects
//like this we use middleware
})

app.use((req,res,next)=>{
  fs.appendFile("log.txt",`\n ${Date.now()},${req.ip},${req.path}`,(err,data)=>{
    next();
  })
})

//Routes

//for html rendering
app.get("/users", async(req, res) => {
const allDBUsers = await User.find({}) //brings all entries in DB



  const html = `
  <ul>
  ${allDBUsers.map((e) => `<li>${e.firstName} - ${e.emailId}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

//REST api

app.get("/api/users", async(req, res) => {
  const allDBUsers = await User.find({})
  return res.json(allDBUsers );
  // res.setHeader("X-NAME","Chiku");//custom header, always a good practice to add X- to custom headers.
  

});

//to get info of an id
app.get("/api/users/:id", async(req, res) => {
  
  const user = await(User.findById(req.params.id));

  
  if(!user) return res.status(404).json({msg:"No user found"})
  if(!user){
    return res.json({message:"user with provided ID does not exists"})
  }
  return res.json(user);
});


//to post info
app.post("/api/users", async(req, res) => {
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

app.patch("/api/users/:id", async(req, res) => {

  await User.findByIdAndDelete(req.params.id,{lastName:req.body.lastName})
  return res.json({ message: "User updated successfully"}) 
  
});


//for deleting user
app.delete("/api/users/:id", async(req,res)=>{
  await User.findByIdAndDelete(req.params.id)
  return res.json({msg:"Successss"})
})






app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));
