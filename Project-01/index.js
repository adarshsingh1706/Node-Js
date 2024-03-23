const express = require("express");
const app = express();
const mongoose = require('mongoose');
const fs = require("fs");
const PORT = 8000;
const useRouter = require("./routes/user.js")

//connect

mongoose.connect('mongodb://127.0.0.1:27017/db1') //returns a promise
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("Error in connection", err))










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


app.use("/user", useRouter)
app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));
