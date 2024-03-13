const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json')
const PORT =8000;

//Routes

//for html rendering
app.get("/users",(req,res)=>{
  const html =`
  <ul>
  ${users.map((e) =>`<li>${e.first_name}</li>`).join("")}
  </ul>
  `
  res.send(html);
})


//REST api

app.get("/api/users",(req,res)=>{
  return res.json(users);
})

app.get("/api/users/:id", (req,res)=>{
  const id = Number(req.params.id); // finding id req se then compairing
  const user = users.find((e)=>e.id===id); // comparing from DB
  return res.json(user);
})









app.listen(PORT,()=>console.log(`Server Started at Port: ${PORT}`));