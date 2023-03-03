const express = require("express");
const router = express.Router();

const isAuth = require("../middlewares/is-auth");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const {
  getProducts,
  getCart,
  getShop,
  getOrders,
  getProductDetails,
  postCart,
  postCartDeleteProduct,
  postOrder,
} = require("../controllers/shop");

//////-------------------------------------------------------------------------------------------------------------------------------//////

router.get("/", getShop);

//////+++++++++++++++++++++++++++++++++++++++++//////

// this allows us to add a middleware function
router.get("/products", getProducts);

// this : signals express that there will be dynamic routing or some kind of variable in the route
// if you had a dynamic segment , make sure it will be at last of the similar routes as express parses the routes from top to bottom

router.get("/products/:productId", getProductDetails);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.get("/cart", isAuth, getCart);

router.post("/cart", isAuth, postCart);

router.post("/cart-delete-item", isAuth, postCartDeleteProduct);

//////+++++++++++++++++++++++++++++++++++++++++//////

router.get("/orders", isAuth, getOrders);

router.post("/create-order", isAuth, postOrder);

//////+++++++++++++++++++++++++++++++++++++++++//////

module.exports = router;
