const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

// khai báo với express server sẽ dùng EJS để biên dịch nội dung động html
app.set("view engine", "ejs");
// các nội dung này sẽ chứa trong views
app.set("views", "views");

// xử lí parse cho data request body gửi từ form input
// như đã xử lí trong lab04 (Buffer.concat(chunkDataFromRequest).toString())
// extended: false: cho phép parse các feature ngoài mặc định
app.use(bodyParser.urlencoded({ extended: false }));

// cho phép dùng các path tĩnh(static) trỏ tới folder public
// nếu có request (trường hợp hiện tại là file html) nào cần tìm file css hoặc js express
// express tự động trỏ request đó đến folder public
// vậy path css trong file html không cần /public
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const server = http.createServer(app);

server.listen(3000);
