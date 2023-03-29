const orderRouter = require("express").Router();
const orderController = require("../controllers/orders");
const { isAuth, authorizationRoles } = require("../middlewares/auth");

orderRouter.route("/order/new").post(isAuth, orderController.newOrder);

orderRouter.route("/order/:id").get(isAuth, orderController.getSingleOrder);

orderRouter.route("/orders/me").get(isAuth, orderController.myOrders);

orderRouter
  .route("/admin/orders")
  .get(isAuth, authorizationRoles("admin"), orderController.getAllOrders);

orderRouter
  .route("/admin/order/:orderId")
  .put(isAuth, authorizationRoles("admin"), orderController.updateOrderStatus)
  .delete(isAuth, authorizationRoles("admin"), orderController.deleteOrder);

module.exports = orderRouter;
