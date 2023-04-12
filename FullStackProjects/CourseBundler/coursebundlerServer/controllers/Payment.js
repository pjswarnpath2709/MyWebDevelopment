import { PaymentErrors } from "../constants/Error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import User from "../models/User.js";
import { razorPayInstance } from "../server.js";
import CustomError from "../utils/CustomError.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";

export const buySubscription = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.role === "admin")
    throw new CustomError(PaymentErrors.AdminNotAllowed);
  const plan_id = process.env.PLAN_ID || "plan_Lc6rITWUuprc5L";
  const subscription = await razorPayInstance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });
  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;
  await user.save();
  res.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});

export const paymentVerification = catchAsyncErrors(async (req, res) => {
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;
  console.log("\x1b[35m", "👉👉👉 req.body :", req.body);
  const user = await User.findById(req.user._id);
  const subscription_id = user.subscription.id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");
  const isAuthentic = generated_signature === razorpay_signature;
  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);
  await Payment.create({
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature,
  });
  user.subscription.status = "active";
  await user.save();
  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorPayKey = catchAsyncErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const cancelSubscription = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);
  const subscriptionId = user.subscription.id;
  let refund = false;
  await razorPayInstance.subscriptions.cancel(subscriptionId);
  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });
  const gap = Date.now() - payment.createdAt;
  const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;
  if (refundTime > gap) {
    refund = true;
    await razorPayInstance.payments.refund(payment.razorpay_payment_id);
  }
  await payment.deleteOne();
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: refund
      ? "subscription canceled you will receive full payment within 7 working days"
      : "no refund initiated as subscription canceled after 7 days",
  });
});
