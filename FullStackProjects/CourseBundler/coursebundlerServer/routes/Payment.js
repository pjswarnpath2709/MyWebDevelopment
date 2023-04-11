import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/Payment.js";

const router = Router();

router.route("/subscribe").get(isAuthenticated, buySubscription);

// verify payment and save reference in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// get razorpay key
router.route("/getrazorpaykey").get(getRazorPayKey);

// cancel subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
