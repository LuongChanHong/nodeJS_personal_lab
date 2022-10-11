// const fs = require("fs");
// const path = require("path");
const db = require("../util/db");

const Cart = require("./cart");

// const p = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    return db.execute(
      "insert into products (title, price, imageUrl, description) values (?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("select * from products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  // save() {
  //   getProductsFromFile((products) => {
  //     if (this.id) {
  //       // console.log("this.id exist:", this.id);
  //       const index = products.findIndex((item) => item.id === this.id);
  //       const addedNewProducts = [...products];
  //       addedNewProducts[index] = this;
  //       fs.writeFile(p, JSON.stringify(addedNewProducts), (err) => {
  //         err ? console.log(err) : "";
  //       });
  //     } else {
  //       this.id = Math.random().toString();
  //       products.push(this);
  //       fs.writeFile(p, JSON.stringify(products), (err) => {
  //         err ? console.log(err) : "";
  //       });
  //     }
  //   });
  // }

  // static deleteById(id) {
  //   getProductsFromFile((products) => {
  //     const product = products.find((item) => item.id === id);
  //     const updatedProducts = products.filter((item) => item.id !== id);
  //     fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
  //       if (!error) {
  //         Cart.deleteProduct(id, product.price);
  //       }
  //     });
  //   });
  // }

  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  // }

  // static findById(id, cb) {
  //   getProductsFromFile((products) => {
  //     const product = products.find((item) => item.id === id);
  //     cb(product);
  //   });
  // }
};
