const http = require("http");

//  HTTP module is a core module and it is useful to transfer the data over HTTP
// The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
const port = 5000;
const message = "I am so happy to be part of the Node Girls workshop";

const route = (request, response) => {
  const endpoint = request.url;
  console.log(endpoint);
  const method = request.method;
  console.log(method);
  if (endpoint === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(message); //response body
    response.end(); // finish response
  } else if (endpoint === "/boy") {
    response.writeHead(200, { "Contnet-Type": "text/html" });
    response.write("Hi boy"); //response body
    response.end(); // finish response
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
