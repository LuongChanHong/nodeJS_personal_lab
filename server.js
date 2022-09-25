const http = require("http");
const express = require("express");

const bodyParser = require("body-parser");
const app = express();

// xử lí parse cho data request body gửi từ form input
// như đã xử lí trong lab04 (Buffer.concat(chunkDataFromRequest).toString())
// extended: false: cho phép parse các feature ngoài mặc định
app.use(bodyParser.urlencoded({ extended: false }));

// thêm và xử dụng middleware
// hàm trong use sẽ khởi chạy mỗi khi có request
app.use("/add-product", (request, response, next) => {
  response.send(
    "<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>add product</button></form>"
  );
});

app.post("/product", (request, response) => {
  console.log(request.body);
  response.redirect("/");
});

app.use("/", (request, response, next) => {
  response.send("<h1>some html page</h1>");
});

const server = http.createServer(app);

server.listen(3000);
