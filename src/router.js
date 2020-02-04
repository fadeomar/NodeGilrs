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
        response.writeHead(200, { "Content-Type": mimeType[ext] });
        response.end(file);
      }
    });
  } else if (endpoint === "/posts") {
    filePath = path.join(__dirname, "posts.json");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        console.log(err);
      } else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(file);
      }
    });
  } else if (endpoint === "/create-post") {
    let chunks = "";
    request.on("data", chunk => {
      chunks += chunk;
    });

    request.on("end", () => {
      data = querystring.parse(chunks);
      const jsonPath = path.join(__dirname, "posts.json");
      fs.readFile(jsonPath, (err, file) => {
        if (err) {
          console.log(err);
        } else {
          const posts = JSON.parse(file);
          const newPost = data;
          posts[Date.now()] = newPost.post;
          fs.writeFile(jsonPath, JSON.stringify(posts), err => {
            if (err) console.log(err);
          });
        }
      });
      response.writeHead(302, { Location: "/" });
      response.end();
    });
  }
};

module.exports = route;
