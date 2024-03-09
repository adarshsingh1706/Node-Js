const { log } = require("console");
const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res) => {
  // this fn is responsible for processing incoming req
  const log = `${Date.now()}: ${req.url} New Request Received\n`;
  const myurl = url.parse(req.url,true); // true for parsing query
  console.log(myurl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myurl.pathname) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        const username = myurl.query.myName;
        res.end(`Hi ${username}`);
        break;

        case "/search":
          const search = myurl.query.search_query;
          res.end(`these r the results for ${search}` );
          break;
      default:
        res.end("404 NOt Found");
    }
  });
});

myServer.listen(8000, () => console.log("Server Started!"));
 