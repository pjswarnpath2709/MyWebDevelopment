const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
// act as a mini app but only used for routing
const router = express.Router();

const products = [];

//////+++++++++++++++++++++++++++++++++++++++++//////

// only fire incoming get requests
// /admin/add-product => GET
router.get("/add-product", (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  response.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

//////+++++++++++++++++++++++++++++++++++++++++//////

// only fire for the incoming post requests
// /admin/add-product => POST
router.post("/add-product", (request, response, nextMiddleware) => {
  products.push({ title: request.body.title });
  response.redirect("/");
});

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.routes = router;
exports.products = products;
