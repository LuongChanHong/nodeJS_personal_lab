const mongodb = require("mongodb");
const getDB = require("../util/db").getDB;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? id : null;
    this.userId = userId;
  }
  save() {
    const db = getDB();
    let _db;
    if (this._id) {
      _db = db.collection("products").updateOne(
        {
          _id: new mongodb.ObjectId(this._id),
        },
        { $set: this }
      );
    } else {
      _db = db.collection("products").insertOne(this);
    }
    _db
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
