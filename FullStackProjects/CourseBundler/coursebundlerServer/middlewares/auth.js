import { AuthErrors } from "../constants/Error.js";
import CustomError from "../utils/CustomError.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new CustomError(AuthErrors.NotLoggedIn);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
});

export const authorizeSubscribers = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    throw new CustomError({
      message: "only subscriber can access this resource",
      statusCode: 403,
    });
  next();
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new CustomError({
        message: `${req.user.role} is not allowed to access this resource`,
        statusCode: 403,
      })
    );
  next();
};
