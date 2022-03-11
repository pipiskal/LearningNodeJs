const replaceTemplate = require("./modules/replaceTemplate");
// requiring the build in http server;
// it gives us networking capabilities to build a server;
const fs = require("fs");
const http = require("http");

// const URL = require("url").URL;

// blocking the rest of the code but its only in the beggining it wont execute again
// this is simply a string json formated we need to convert to object (Javascript Object Notation)-string
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// prettier-ignore
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8");
// prettier-ignore
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8");
// prettier-ignore
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8");
const productData = JSON.parse(data);
// we create a server
// return a new instance of server
// the callback function will run each time a new request hits the server
const server = http.createServer((request, response) => {
  const baseUrl = "http://" + request.headers.host + "/";
  const url = new URL(request.url, baseUrl);
  const pathName = url.pathname;
  let productId = url.searchParams.get("id");
  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    response.writeHead(200, { "Content-type": "text/html" });

    // we map over the products and use them to receive an array of html cards
    // with replaced values from the actuall products we looped over
    const cardsHtml = productData
      .map((product) => replaceTemplate(tempCard, product))
      .join("");
    // prettier-ignore
    const finalTempOverview = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    response.end(finalTempOverview);

    // Product Page
  } else if (pathName === "/product") {
    const product = productData[productId];

    const output = replaceTemplate(tempProduct, product);

    response.end(output);

    // API
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

    // Not Found
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
