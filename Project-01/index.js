const express = require("express");
const app = express();
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8000;

//middleware:plugin
app.use(express.urlencoded({ extended: false }));

//Routes

//for html rendering
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((e) => `<li>${e.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

//REST api

app.get("/api/users", (req, res) => {
  return res.json(users);
});

//to get info
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); // finding id req se then compairing
  const user = users.find((e) => e.id === id); // comparing from DB
  if(!user){
    return res.json({message:"user with provided ID does not exists"})
  }
  return res.json(user);
});


//to post info
app.post("/api/users", (req, res) => {
  const body = req.body; //whatever data comes from frontend is stored here
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
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

  Object.assign(userToUpdate, updatedData);
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
