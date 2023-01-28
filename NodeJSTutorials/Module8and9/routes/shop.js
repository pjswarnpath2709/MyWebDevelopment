const express = require("express");
const router = express.Router();

//////-------------------------------------------------------------------------------------------------------------------------------//////

const {  getProducts } = require("../controllers/products");

//////-------------------------------------------------------------------------------------------------------------------------------//////

// this allows us to add a middleware function
router.get("/", getProducts);

module.exports = router;
