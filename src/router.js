const fs = require("fs");
const querystring = require("querystring");
const path = require("path");

const route = (request, response) => {
  const endpoint = request.url;
  if (endpoint === "/") {
    const filePath = path.join(__dirname, "..", "public", "index.html");

    fs.readFile(filePath, (err, file) => {
      if (err) {
        console.log(err);
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });

        response.end(file);
      }
    });
  } else if (endpoint.includes("/public")) {
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
        res.writeHead(200, { "Content-Type": mimeType[ext] });
        res.end(file);
      }
    });
  }
};

module.exports = route;
