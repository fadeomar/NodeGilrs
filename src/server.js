const http = require("http");

const route = require("./router");

const port = 5000;

const server = http.createServer(route);

server.listen(port, () => {
  console.log(`the server running at port ${port} http://localhost:${port}`);
});
