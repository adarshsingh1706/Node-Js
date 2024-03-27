const express = require("express");
const{connectMongoDb} = require("./connection.js")
const{logReqRes} = require("./middlewares")
const useRouter = require("./routes/user.js");
const app = express();
const PORT = 8000;





//connection
connectMongoDb("mongodb://127.0.0.1:27017/db1");

//middleware:plugin
app.use(logReqRes("log.txt"))

app.use("/user", useRouter);
app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));
