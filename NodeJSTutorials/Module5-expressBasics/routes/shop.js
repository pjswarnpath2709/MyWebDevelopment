const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const router = express.Router();

//////-------------------------------------------------------------------------------------------------------------------------------//////

const adminData = require("./admin");

//////-------------------------------------------------------------------------------------------------------------------------------//////

// this allows us to add a middleware function
router.get("/", (request, response, nextMiddleware) => {
  //////+++++++++++++++++++++++++++++++++++++++++//////

  console.log("\x1b[36m", "👍👍👍", adminData.products);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const products = adminData.products;

  // send allow us to send anything of type anything
  // to send data send it in key:value format
  response.render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/",
    activeShop: true,
    activeAddProduct: false,
    productCss: true,
    formCSS: true,
  });
  //  nextMiddleware(); // allows us to go to next middleware
});

module.exports = router;
