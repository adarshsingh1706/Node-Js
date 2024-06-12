const express = require('express');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require("./connection");
const URL = require('./model/url')

connectToMongoDB(process.env.MONGO_URL)
.then(()=>console.log("MongoDb Connected"));
//middleware
app.use(express.json());

app.use("/url", urlRoute);
app.get("/shortId",async(req,res)=>{
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({
  shortId
},{ $push:{
  visitHistory:{
     timestamp:Date.now(),
  },
}
})
res.redirect(entry.redirectUrl)
})


app.listen(process.env.PORT,()=> console.log(`Server Started at port: ${PORT}`))