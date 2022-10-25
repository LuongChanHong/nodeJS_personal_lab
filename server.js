const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/db").mongoConnect;

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
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

app.use((request, response, next) => {
  User.findByID("635652c316d219afdb97cb89")
    .then((user) => {
      request.user = new User(user.name, user.email, user.cart, user._id);
      // console.log("request.user:", request.user);
      next();
    })
    .catch((err) => console.log("err:", err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
