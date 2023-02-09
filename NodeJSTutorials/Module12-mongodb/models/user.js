const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

class User {
  constructor({ username, email, cart, _id }) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cart_product) => {
      return cart_product.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db.collection("users").updateOne(
      {
        _id: new ObjectId(this._id),
      },
      {
        $set: {
          cart: updatedCart,
        },
      }
    );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(
      (item) => new ObjectId(item.productId)
    );
    return db
      .collection("products")
      .find({
        _id: {
          $in: productIds,
        },
      })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === product._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => console.error("\x1b[31m", " 👎👎👎 user.js : ", err));
  }

  deleteItemFromCart(productId) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    return db.collection("users").updateOne(
      {
        _id: new ObjectId(this._id),
      },
      {
        $set: {
          cart: { items: updatedCartItems },
        },
      }
    );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
            email: this.email,
          },
          items: products,
        };
        return order;
      })
      .then((order) => {
        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db.collection("users").updateOne(
          {
            _id: new ObjectId(this._id),
          },
          {
            $set: {
              cart: { items: [] },
            },
          }
        );
      })
      .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({
        "user._id": new ObjectId(this._id),
      })
      .toArray()
      .catch((err) =>
        console.error("\x1b[31m", " 👎👎👎 : user.js@136 :", err)
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({
      _id: new ObjectId(userId),
    });
  }
}

module.exports = User;
