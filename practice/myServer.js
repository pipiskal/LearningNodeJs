const http = require("http");
const fs = require("fs");

const products = fs.readFileSync(`${__dirname}/../dev-data/data.json`);

const server = http.createServer((request, response) => {
  // when the server gets a request it will go here

  //getting the url fro, the request
  const urlPath = request.url.slice(1, request.url.length);
  console.log(urlPath);
  if (urlPath === "products") {
    // inform the browser what he is going to receive, add the headers
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(products);
  } else {
    response.end("Hello from server");
  }
});

// we need the server to listen to a port;

server.listen(9000, "127.0.0.1", () => {
  console.log("Listening on port 9000");
});
