const fs = require("fs");

function logReqRes(fileName){
  return(req,res,next) =>{
    fs.appendFile(fileName,`\n${Date.now()}:${req.ip}:${req.path}\n`,
      (err,data)=>{
        next(); // next fn can be executed
      }
    )
  }
}

module.exports = {
  logReqRes
}


/*This code defines a middleware function `logReqRes` that logs incoming requests to a specified file. Here's a summary of what's happening:

1. The `logReqRes` function takes a `fileName` argument, which specifies the file to which the logs will be appended.

2. Inside `logReqRes`, a new middleware function is returned, which takes `req`, `res`, and `next` as arguments (standard Express middleware signature).

3. `fs.appendFile` is used to append a log entry to the specified file. The log entry includes the current timestamp (`Date.now()`), the IP address of the request (`req.ip`), and the path of the request (`req.path`). The log entry is formatted as `${timestamp}:${ip}:${path}`.

4. Once the log entry is appended, the `next()` function is called to pass control to the next middleware in the stack.

5. The `logReqRes` function is exported as part of an object, making it available for use in other parts of the application.

Overall, this middleware function allows you to log incoming requests to a file, which can be useful for debugging and monitoring purposes in an Express.js application. */