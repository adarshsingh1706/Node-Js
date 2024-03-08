const { log } = require("console");
const http = require("http");
const fs = require("fs");


const myServer = http.createServer((req, res) => {
  // this fn is responsible for processing incoming req
  const log = `${Date.now()}: ${req.url} New Request Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        res.end("I am Adarsh Singh");
        break;
      default:
        res.end("404 NOt Found");
    }
  });
});

myServer.listen(8000, () => console.log("Server Started!"));
