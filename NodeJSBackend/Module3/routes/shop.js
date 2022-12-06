const path = require("path");
const rootDir = require("../util/path.js");
const express = require("express");
const { builtinModules } = require("module");

const Router = express.Router();

Router.get("/", function (req, res, next) {
  // console.log("In another middleware!");

  // sending the response
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = Router;
