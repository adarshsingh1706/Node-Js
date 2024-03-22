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

})
 
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
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((e) => `<li>${e.first_name},${e.gender}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

//REST api

app.get("/api/users", (req, res) => {
  console.log(req.headers);
  res.setHeader("X-NAME","Chiku");//custom header, laways a good practice to add X- to custom headers.
  return res.json(users);

});

//to get info of an id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); // finding id req se then compairing
  const user = users.find((e) => e.id === id); // comparing from DB
  
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
  console.log("result" , result);

 return res.status(201).json({msg:"success"})




});


//editing using patch

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;

  const userToUpdate = users.find((e) => e.id === id);
  if (!userToUpdate) {
    return res
      .status(404)
      .json({ Error: "User Not found, please provide a valid ID" });
  }

  Object.assign(userToUpdate, updatedData); //data copied from updatedData to  userToUpdate
  return res.json({ message: "User updated successfully", user: userToUpdate });
});


//for deleting user
app.delete("/api/users/:id", (req,res)=>{
  const id = Number( req.params.id);
  

  const userToDeleteIndex = users.findIndex((e)=>e.id === id);

   //error handling
  if(userToDeleteIndex==-1){
    return res
    .status(404)
    .json({message:"No user available with that ID" ,})
  }

  // when found
  users.splice(userToDeleteIndex,1); //users.splice(start,deletecount);
  return res.json({message:"User deleted succesfully"})
})






app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));
