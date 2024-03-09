const http = require("http");
const express = require('express')
const app = express();


//app.METHOD(PATH,HANDLER_FN)

app.get("/",(req,res)=>{
  res.end("HI from homepage")
})

app.get("/about",(req,res)=>{
  res.end("Hello from about page")
})

app.get("/info",(req,res)=>{
  res.end(`Hello ${req.query.name}` );
})

// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log("Server Started!"));

app.listen(8000,()=>console.log("Server Started!"));
 