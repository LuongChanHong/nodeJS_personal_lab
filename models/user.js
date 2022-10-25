const mongodb = require("mongodb");
const getDB = require("../util/db").getDB;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    let setObject;
    // trường hợp user đã có object cart
    if (this.cart) {
      const index = this.cart.items.findIndex(
        (item) => item.productId.toString() === product._id.toString()
      );
      const updateItems = [...this.cart.items];
      if (index >= 0) {
        updateItems[index].quantity = updateItems[index].quantity + 1;
      } else {
        updateItems.push({
          productId: new mongodb.ObjectId(product._id),
          quantity: 1,
        });
      }
      setObject = {
        cart: {
          items: updateItems,
        },
      };
      // trường hợp user chưa có object cart
    } else {
      this.cart = { items: [{ productId: product._id, quantity: 1 }] };
      setObject = this;
    }
    const db = getDB();
    return db
      .collection("users")
      .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: setObject });
  }

  static findByID(id) {
    const db = getDB();
    return db.collection("users").findOne({ _id: mongodb.ObjectId(id) });
  }
}

module.exports = User;
