const mongodb = require("mongodb");
const getDB = require("../util/db").getDB;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();
    // nếu collection chưa tồn tại trong database,
    // mongodb sẽ tự tạo collection này và add doc this
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("result:", result);
      })
      .catch((err) => console.log("err:", err));
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        // console.log("products:", products);
        return products;
      })
      .catch((err) => console.log("err:", err));
  }

  static findByID(id) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        // console.log('product:',product);
        return product;
      })
      .catch((err) => console.log("err:", err));
  }

  static deleteByID(id) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .catch((err) => console.log("err:", err));
  }
}

module.exports = Product;
