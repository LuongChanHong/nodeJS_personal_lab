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
    db.collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("result:", result);
      })
      .catch((err) => console.log("err:", err));
  }
}

module.exports = Product;
