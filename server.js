const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const mongoConnect = require("./util/db").mongoConnect;

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
  User.findById("6358f5856fed1c1ea865fd32")
    .then((user) => {
      request.user = user;
      next();
    })
    .catch((err) => console.log("err:", err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://mongodb_admin:mongodb_admin@cluster0.e6b0l5j.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "User",
            email: "user@email.com",
            cart: { items: [] },
          });
          user.save();
        }
      })
      .catch((err) => console.log("::ERROR:", err));
    app.listen(3000);
  })
  .catch((err) => console.log("mongoose connect err:", err));
