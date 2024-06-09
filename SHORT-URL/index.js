const express = require('express');
const app = express();
const PORT = 7001;
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require("./connection");

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("MongoDb Connected"));
//middleware
app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT,()=> console.log(`Server Started at port: ${PORT}`))