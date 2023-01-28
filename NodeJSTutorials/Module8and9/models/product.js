const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "products.json");
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
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.error("\x1b[31m", " 👎👎👎 error:", err);
      });
    });
  }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }
};
