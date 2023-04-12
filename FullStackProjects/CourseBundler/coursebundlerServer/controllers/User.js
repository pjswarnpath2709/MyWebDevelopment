import User from "../models/User.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { checkAllProvided } from "../utils/helper.js";
import CustomError from "../utils/CustomError.js";
import { AuthErrors, CourseErrors, UserErrors } from "../constants/Error.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import Course from "../models/Course.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import Stats from "../models/Stats.js";

export const register = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;
  const avatarFile = req.file;
  if (!checkAllProvided(name, email, password, avatarFile))
    throw new CustomError(UserErrors.RequiredFieldsNotProvided);
  let user = await User.findOne({ email });
  if (user) throw new CustomError(UserErrors.UserAlreadyExists);
  const fileUri = getDataUri(avatarFile);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(res, user, "registered successfully", 201);
});

export const login = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  if (!checkAllProvided(email, password))
    throw new CustomError(UserErrors.RequiredFieldsNotProvided);
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new CustomError(UserErrors.IncorrectEmailOrPassword);
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new CustomError(UserErrors.IncorrectEmailOrPassword);
  }
  sendToken(res, user, `welcome back ${user.name}`, 200);
});

export const logout = catchAsyncErrors(async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .clearCookie("token")
    .json({
      success: true,
      message: "logged out successfully",
    });
});

export const getMyProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!checkAllProvided(oldPassword, newPassword))
    throw new CustomError(UserErrors.RequiredFieldsNotProvided);
  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) throw new CustomError(AuthErrors.PasswordNotMatch);
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "password changed successfully",
  });
});

export const updateProfile = catchAsyncErrors(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (email) user.email = email;
  await user.save();
  res.status(200).json({
    success: true,
    message: "profile changed successfully",
  });
});

export const updateProfilePicture = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);
  const file = req.file;
  if (req.file) {
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    user.avatar = { public_id: myCloud.public_id, url: myCloud.secure_url };
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "profile picture updated successfully",
  });
});

export const forgetPassword = catchAsyncErrors(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new CustomError(UserErrors.UserNotFound);
  const resetToken = await user.getResetToken();
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `click on the link to reset your password . ${url}. if you have not requested then please ignore.`;
  await sendEmail(user.email, "CourseBundler Reset Password Token", message);
  res.status(200).json({
    success: true,
    message: `user token has been send to ${user.email}`,
  });
});

export const resetPassword = catchAsyncErrors(async (req, res) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) throw new CustomError(AuthErrors.TokenInvalidOrExpired);
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "password reset successfully",
  });
});

export const addToPlaylist = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);
  if (!course) throw new CustomError(CourseErrors.CourseNotFound);
  const itemExists = user.playlist.find(
    (item) => item.course._id.toString() === course._id.toString()
  );
  if (itemExists) throw new CustomError(UserErrors.AlreadyPresentInPlaylist);
  user.playlist.push({ course: course._id, poster: course.poster.url });
  await user.save();
  res.status(200).json({
    success: true,
    message: "added to playlist",
  });
});

export const deleteFromPlaylist = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) throw new CustomError(CourseErrors.CourseNotFound);
  user.playlist = user.playlist.filter(
    (item) => item.course._id.toString() !== course._id.toString()
  );
  await user.save();
  res.status(200).json({
    success: true,
    message: "Removed from playlist",
  });
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new CustomError(UserErrors.UserNotFound);
  if (user.role === "user") user.role = "admin";
  else user.role = "user";
  await user.save();
  res.status(200).json({
    success: true,
    message: "user role updated successfully",
  });
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new CustomError(UserErrors.UserNotFound);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  //todo : cancel subscription
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "deleted user successfully",
  });
});

export const deleteMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new CustomError(UserErrors.UserNotFound);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  //todo : cancel subscription
  await user.deleteOne();
  res.status(200).clearCookie("token").json({
    success: true,
    message: "deleted user successfully",
  });
});

User.watch().on("change", async () => {
  const stats = await Stats.find().sort({ createdAt: "desc" }).limit(1);
  if (stats.length <= 0) {
    return;
  }
  const subscriptions = await User.find({
    "subscription.status": "active",
  }).count();
  stats[0].subscriptions = subscriptions.length;
  stats[0].users = await User.countDocuments();
  stats[0].createdAt = new Date(Date.now());
  await stats[0].save();
});
