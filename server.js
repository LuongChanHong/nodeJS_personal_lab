const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const adminData = require("./routes/admin");
const shopData = require("./routes/shop");

// xử lí parse cho data request body gửi từ form input
// như đã xử lí trong lab04 (Buffer.concat(chunkDataFromRequest).toString())
// extended: false: cho phép parse các feature ngoài mặc định
app.use(bodyParser.urlencoded({ extended: false }));

// cho phép dùng các path tĩnh(static) trỏ tới folder public
// nếu có request (trường hợp hiện tại là file html) nào cần tìm file css hoặc js express
// express tự động trỏ request đó đến folder public
// vậy path css trong file html không cần /public
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.route);
app.use(shopData.route);
app.use((request, response, next) => {
  response.status(404).sendFile(path.join(__dirname, "MVCviews", "404.html"));
});

const server = http.createServer(app);

server.listen(3000);
