// mở terminal gõ node server.js để chạy
// nhập url localhost:3000 vào browser để tương tác với server

const http = require("http");
//C1:
const routes = require("./routes");
//C2:
// const routes = require("./routes");

// function requestListener(request, response) {}

const server = http.createServer(routes.handler);

server.listen(3000);
