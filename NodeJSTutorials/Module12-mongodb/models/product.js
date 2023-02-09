const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const { getDb } = require("../utils/database");

class Product {
  constructor({ title, price, description, imageUrl, id , userId }) {
    this._id = id ? new ObjectId(id) : null;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.userId = userId;

  }

  save() {
    const db = getDb();
    let dpOp;
    if (this._id) {
      dpOp = db.collection("products").updateOne(
        {
          _id: this._id,
        },
        {
          $set: this,
        }
      );
    } else {
      dpOp = db.collection("products").insertOne(this);
    }

    return dpOp
      .then((result) => {
        console.log("\x1b[35m", "👉👉👉 result :", result);
      })
      .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.error("\x1b[31m", " 👎👎👎 :", err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({
        _id: new mongodb.ObjectId(id),
      })
      .next()
      .then((product) => product)
      .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({
        _id: new ObjectId(id),
      })
      .then((result) => result)
      .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
  }
}

module.exports = Product;
