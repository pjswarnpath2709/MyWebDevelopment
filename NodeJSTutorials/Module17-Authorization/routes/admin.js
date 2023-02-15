const express = require("express");
// act as a mini app but only used for routing
const router = express.Router();

const isAuth = require("../middlewares/is-auth");

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
router.get("/add-product", isAuth, getAddProduct);

// only fire for the incoming post requests
// /admin/add-product => POST
router.post("/add-product", isAuth, postAddProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.get("/products", isAuth, getAdminProducts);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post("/edit-product", isAuth, postEditProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
