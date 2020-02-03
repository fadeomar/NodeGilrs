const http = require("http");

//  HTTP module is a core module and it is useful to transfer the data over HTTP
// The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
const server = http.createServer();
// Use the createServer() method to create an HTTP server
const port = 5000;

server.listen(port, () => {
  console.log(
    `Server is listening on port ${port}.  Ready to accept requests!`
  );
});
//the server object listens on port 5000
