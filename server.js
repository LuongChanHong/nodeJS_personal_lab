const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/db");

const errorController = require("./controllers/error");
const sequelize = require("./util/db");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");

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
  User.findByPk(1)
    .then((user) => {
      request.user = user;
      // console.log("request.user:", request.user);
      next();
    })
    .catch((err) => console.log("err:", err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Product.belongsTo(User, { constranints: true, onDelete: "CASCADE" });
User.hasMany(Product, { constranints: true, onDelete: "CASCADE" });
User.hasOne(Cart);
Cart.hasMany(CartItem);
Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "User", email: "somemail@mail.com" });
    }
    return user;
  })
  // .then((user) => {
  //   return user.createCart();
  // })
  // .then((cart) => {
  //   app.listen(3000);
  // })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => console.log("err:", err));
