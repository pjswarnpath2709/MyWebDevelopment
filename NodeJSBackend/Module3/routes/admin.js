const express = require("express");
const path = require("path");
const rootDir = require("../util/path.js");
const Router = express.Router();
// this middleware is made to write first because the filtering is done like
// url starting with "/add-product"
Router.use("/add-product", function (req, res, next) {
  // console.log("In add-product middleware!");

  // sending the response , after this another middleware will not be called , act as a return statement
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// will only trigger for incoming post request , app.get() will trigger only for get request
Router.post("/add-product", function (req, res, next) {
  console.log(req.body);
  res.redirect("/");
});

module.exports = Router;
