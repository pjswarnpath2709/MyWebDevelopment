const paymentRouter = require("express").Router();
const paymentController = require("../controllers/payment");
const { isAuth } = require("../middlewares/auth");

paymentRouter
  .route("/payment/process")
  .post(isAuth, paymentController.processPayment);

paymentRouter
  .route("/stripeapikey")
  .get(isAuth, paymentController.sendStripeApiKey);

module.exports = paymentRouter;
