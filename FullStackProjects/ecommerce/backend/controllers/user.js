const { errorMessages, ErrorHandler } = require("../utils/errorHandler");
const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

exports.registerUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        imageUrl: myCloud.secure_url,
      },
    });
    sendToken({ user, res, statusCode: 201 });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking for email and password
    if (!email || !password) {
      throw new ErrorHandler(errorMessages.EmailAndPasswordNotGiven);
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ErrorHandler(errorMessages.UserNotFound);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      throw new ErrorHandler(errorMessages.UserNotFound);
    }

    sendToken({ user, res, statusCode: 200 });
  } catch (err) {
    next(err);
  }
};

// logout user
exports.logout = async (req, res, next) => {
  try {
    // make the cookie value null
    // res.cookie("token", null, {
    //   maxAge: new Date(Date.now()),
    //   expires : new Date(Date.now()),
    //   httpOnly: true,
    // });

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "logout successfully",
    });
  } catch (err) {
    next(err);
  }
};

// forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new ErrorHandler(errorMessages.UserWithEmailNotFound);
    }
    // get resetPassword token
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your Password reset Token is :- 

    ${resetPasswordUrl}

    If you have not requested this email then, please ignore it.
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: `Password Reset for your Pulkit-E-Commerce account`,
        message: message,
      });

      res.status(200).json({
        success: true,
        message: `Email send to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      throw new ErrorHandler({ message: error.message, statusCode: 500 });
    }
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      throw new ErrorHandler(errorMessages.ResetPasswordTokenInvalidOrExpired);
    }

    if (req.body.password !== req.body.confirmPassword) {
      throw new ErrorHandler(errorMessages.PasswordNotMatch);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken({ user, statusCode: 200, res });
  } catch (err) {
    next(err);
  }
};

// get user details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      message: "user fetched",
      user: user._doc,
    });
  } catch (err) {
    next(err);
  }
};

// update user Password
exports.updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(errorMessages.OldPasswordMistMatched);
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      throw new ErrorHandler(errorMessages.PasswordNotMatch);
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken({ user, statusCode: 200, res });
  } catch (err) {
    next(err);
  }
};

// update profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user._id);
      const imageId = user.avatar.public_id;
      await cloudinary.uploader.destroy(imageId);
      const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        imageUrl: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      user: user._doc,
    });
  } catch (err) {
    next(err);
  }
};

//get all users --Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "users fetched",
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

// get Single User --Admin
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ErrorHandler(errorMessages.UserDoesNotExists(req.params.id));
    }
    res.status(200).json({
      success: true,
      message: "user fetched",
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

// update User Role --Admin
exports.updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "role updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// delete User --Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ErrorHandler(errorMessages.UserDoesNotExists(req.params.id));
    }

    await user.deleteOne();
    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
