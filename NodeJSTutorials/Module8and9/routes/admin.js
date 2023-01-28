const express = require("express");
// act as a mini app but only used for routing
const router = express.Router();

//////-------------------------------------------------------------------------------------------------------------------------------//////

const { getAddProduct, postAddProduct } = require("../controllers/products");

//////-------------------------------------------------------------------------------------------------------------------------------//////

// only fire incoming get requests
// /admin/add-product => GET
router.get("/add-product", getAddProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

// only fire for the incoming post requests
// /admin/add-product => POST
router.post("/add-product", postAddProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

module.exports = router;
