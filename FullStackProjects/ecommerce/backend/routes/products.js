const express = require("express");
const productController = require("../controllers/product");
const { isAuth, authorizationRoles } = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.get("/products", productController.getAllProducts);

productRouter.get("/product/:id", productController.getSingleProduct);

productRouter.post(
  "/admin/product/new",
  isAuth,
  authorizationRoles("admin"),
  productController.createProduct
);

productRouter.put(
  "/admin/product/:id",
  isAuth,
  authorizationRoles("admin"),
  productController.updateProduct
);

productRouter.delete(
  "/admin/product/:id",
  isAuth,
  authorizationRoles("admin"),
  productController.deleteProduct
);

productRouter
  .route("/admin/products")
  .get(isAuth, authorizationRoles("admin"), productController.getAdminProducts);

productRouter
  .route("/review")
  .put(isAuth, productController.createProductReview)
  .delete(isAuth, productController.deleteReview);

productRouter.route("/reviews/:productId").get(productController.getAllReviews);

module.exports = productRouter;
