const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "products.json");
const Cart = require("./cart");
const getProductsFromFile = (callBack) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callBack([]);
      return;
    }
    callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor({ id, title, description, imageUrl, price }) {
    if (id !== null) {
      this.id = id;
      this.updating = true;
    } else {
      this.id = Date.now() + "" + Math.floor(Math.random() * 2000);
      this.updating = false;
    }
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          // remove the product from the cart also
          Cart.deleteProduct(id, product.price);
        } else {
          console.log("\x1b[35m", "👉👉👉 err :", err);
        }
      });
    });
  }

  save() {
    getProductsFromFile((products) => {
      if (this.updating) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = {
          title: this.title,
          description: this.description,
          price: this.price,
          imageUrl: this.imageUrl,
          id: this.id,
        };
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.error("\x1b[31m", "👎👎👎 error:", err);
        });
      } else {
        products.push({
          title: this.title,
          description: this.description,
          price: this.price,
          imageUrl: this.imageUrl,
          id: this.id,
        });
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.error("\x1b[31m", "👎👎👎 error:", err);
        });
      }
    });
  }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static findById(id, callBack) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      callBack(product);
    });
  }
};
