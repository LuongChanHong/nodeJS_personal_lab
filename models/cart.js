const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      let updatedProducts;
      if (!error) {
        cart = JSON.parse(fileContent);
        const index = cart.products.findIndex((item) => item.id === id);
        console.log("index:", index);
        updatedProducts = cart.products[index];
        if (updatedProducts) {
          updatedProducts.quantity = updatedProducts.quantity + 1;
          cart.products[index] = updatedProducts;
        } else {
          updatedProducts = { id: id, quantity: 1 };
          cart.products = [...cart.products, updatedProducts];
        }
      }
      cart.totalPrice = cart.totalPrice + price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        err ? console.log("err:", err) : "";
      });
    });
  }
};
