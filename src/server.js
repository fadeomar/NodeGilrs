const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

//  HTTP module is a core module and it is useful to transfer the data over HTTP
// The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
const port = 5000;
const message = "I am so happy to be part of the Node Girls workshop";

const route = (request, response) => {
  const endpoint = request.url;
  console.log(endpoint);
  const method = request.method;
  // console.log(method);
  if (endpoint === "/") {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    console.log(filePath);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    });
  } else if (endpoint.includes("public")) {
    const mimeType = {
      css: "text/css",
      html: "text/html",
      js: "application/javascript",
      ico: "image/x-icon",
      jpg: "image/jpg",
      json: "application/json",
      png: "image/png"
    };
    const filePath = path.join(__dirname, "..", ...endpoint.split("/"));
    const ext = endpoint.split(".")[1];
    fs.readFile(filePath, (err, file) => {
      if (err) {
        console.log(err);
      } else {
        response.writeHead(200, { "Content-Type": mimeType[ext] });
        response.end(file);
      }
    });
  } else if (endpoint === "/create-post") {
    let allTheData = "";
    request.on("data", chunkOfData => {
      allTheData += chunkOfData;
    });

    request.on("end", () => {
      const convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(302, { Location: "/" });
      response.end();
    });
  } else if (endpoint === "/girl") {
    response.writeHead(200, { "Contnet-Type": "text/html" });
    response.write("Hi girl"); //response body
    response.end(); // finish response
  }
};

const server = http.createServer(route);
// Use the createServer() method to create an HTTP server

server.listen(port, () => {
  console.log(
    `Server is listening on port ${port}.  Ready to accept requests!`
  );
});
//the server object listens on port 5000
