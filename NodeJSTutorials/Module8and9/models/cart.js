const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the old or previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (item) => item.id === id
      );

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProductIndex >= 0) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.error("\x1b[31m", " 👎👎👎 :", err);
      });
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const qty = +product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice -= qty * productPrice;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.error("\x1b[31m", " 👎👎👎 :", err);
      });
    });
  }

  static getCart(callBack) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callBack(null);
      } else {
        const cart = JSON.parse(fileContent);
        callBack(cart);
      }
    });
  }
};
