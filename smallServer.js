// requiring the build in http server;
// it gives us networking capabilities to build a server;
const fs = require("fs");
const http = require("http");
const url = require("url");
const util = require("util");

// blocking the rest of the code but we dont care for now
const data = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8",
  (error, data) => {}
);

// we create a server
// return a new instance of server
// the callback function will run each time a new request hits the server
const server = http.createServer((request, response) => {
  const pathName = request.url;
  if (pathName === "/" || pathName === "/overview") {
    response.end("This is the overview");
  } else if (pathName === "/api") {
    // Every time someone hits /api url the data will be read again and then will be sent back
    // as a response to the browser. It would be bettter to read the file once and sent it
    // each time som,eone hits the /api istead of reading the file again and again from the
    // beginning. So we will make it synchronouns
    // lets add the headers as well so the browser will know what to excect to receive
    response.writeHead(200, {
      "Content-type": "application/json",
    });

    response.end(data);
  } else if (pathName === "/products") {
    response.end("this is the products page");
  } else {
    // sends headers
    // a http header is a piece of information about the response we are sending back
    // like "Content-type" : "text/html"  , what the prowser expects to recieve
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello-World",
    });
    response.end(
      "<h1>I dont know what to do, This page could not be Found</h1>"
    );
  }
});

// we start the server to lister to ingoming requests

// the callback function will run when the server recieves requests
server.listen(8000, "127.0.0.1", () => {
  console.log("Listerning to request on port 8000");
});

// API --> a service that we can request some data.
