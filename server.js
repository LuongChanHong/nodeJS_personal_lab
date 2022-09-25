const http = require("http");
const express = require("express");

const app = express();

// thêm và xử dụng middleware
// hàm trong use sẽ khởi chạy mỗi khi có request
app.use((request, response, next) => {
  console.log("middleware run");
  next(); // cho phép request được chạy đến middleware tiếp theo
});

app.use((request, response, next) => {
  console.log("middleware run again");
  response.send("<h1>some html</h1>");
});

const server = http.createServer(app);

server.listen(3000);
