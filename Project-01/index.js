const express = require("express");
const{connectMongoDb} = require("./connection.js")
const{logReqRes} = require("./middlewares")
const useRouter = require("./routes/user.js");
const app = express();
const PORT = 8000;


//connection
connectMongoDb("mongodb://127.0.0.1:27017/db1").then(()=>console.log("MongoDb Connected"));

//middleware:plugin
app.use(logReqRes("log.txt"))

app.use("/api/users", useRouter);

app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));


/*This code sets up an Express.js server with MongoDB connection and middleware for logging request/response information. Here's a summary of what's happening:

1. `const express = require("express");` - Importing the Express.js library.

2. `const { connectMongoDb } = require("./connection.js");` - Importing the `connectMongoDb` function from the `connection.js` file, which is used to connect to the MongoDB database.

3. `const { logReqRes } = require("./middlewares");` - Importing the `logReqRes` middleware function from the `middlewares.js` file, which logs request/response information to a file.

4. `const useRouter = require("./routes/user.js");` - Importing the user routes from the `user.js` file.

5. `const app = express();` - Creating an instance of the Express application.

6. `const PORT = 8000;` - Defining the port number on which the server will listen for incoming requests.

7. Connecting to the MongoDB database using the `connectMongoDb` function and logging a message to the console once the connection is established.

8. Using the `logReqRes` middleware to log request/response information to a file named "log.txt".

9. Mounting the user routes under the "/api/users" path prefix using the `use` method.

10. Starting the Express server and listening on the specified port, and logging a message to the console once the server is started.

This setup allows the Express server to handle incoming requests for user-related operations, connect to a MongoDB database, and log request/response information to a file. */