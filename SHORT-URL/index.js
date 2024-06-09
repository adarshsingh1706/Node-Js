const express = require('express');
const app = express();
const PORT = 7001;
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require("./connection");
const URL = require('./model/url')

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
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


app.listen(PORT,()=> console.log(`Server Started at port: ${PORT}`))