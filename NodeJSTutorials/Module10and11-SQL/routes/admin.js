const express = require("express");
// act as a mini app but only used for routing
const router = express.Router();

//////-------------------------------------------------------------------------------------------------------------------------------//////

const {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

//////-------------------------------------------------------------------------------------------------------------------------------//////

// only fire incoming get requests
// /admin/add-product => GET
router.get("/add-product", getAddProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.get("/products", getAdminProducts);

//////+++++++++++++++++++++++++++++++++++++++++//////

// only fire for the incoming post requests
// /admin/add-product => POST
router.post("/add-product", postAddProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.post("/delete-product", postDeleteProduct);

module.exports = router;
