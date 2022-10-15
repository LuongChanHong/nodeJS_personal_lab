const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Cart;

// const fs = require("fs");
// const path = require("path");

// const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

// module.exports = class Cart {
//   static addProduct(id, price) {
//     fs.readFile(p, (error, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       let updatedProducts;
//       if (!error) {
//         cart = JSON.parse(fileContent);
//         const index = cart.products.findIndex((item) => item.id === id);
//         updatedProducts = cart.products[index];
//         if (updatedProducts) {
//           updatedProducts.quantity = updatedProducts.quantity + 1;
//           cart.products[index] = updatedProducts;
//         } else {
//           updatedProducts = { id: id, quantity: 1 };
//           cart.products = [...cart.products, updatedProducts];
//         }
//       }
//       cart.totalPrice = cart.totalPrice + price;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         err ? console.log("err:", err) : "";
//       });
//     });
//   }

//   static deleteProduct(id, price) {
//     fs.readFile(p, (error, fileContent) => {
//       if (error) {
//         return;
//       }
//       const cart = JSON.parse(fileContent);
//       const willDeleteProduct = cart.products.find((item) => item.id === id);
//       const quantity = willDeleteProduct.quantity;
//       cart.products = cart.products.filter((item) => item.id !== id);
//       cart.totalPrice = cart.totalPrice - price * quantity;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         err ? console.log("err:", err) : "";
//       });
//     });
//   }

//   static getCart(callback) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (!err) {
//         callback(cart);
//       } else {
//         callback(null);
//       }
//     });
//   }
// };
