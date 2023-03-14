const Admin = require("../models/admin");
const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const {
  throwError,
  errorMessages,
  setDefaultStatus,
} = require("../utils/errors");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (errors) {
    }

    const { name, email, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);

    const admin = new Admin({
      name,
      email,
      password: hashedPw,
    });
    await admin.save();
    res.status(200).json({
      adminId: admin._id.toString(),
      message: "admin created",
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      console.error("\x1b[31m", " 👎👎👎 : admin not found");
      throw throwError(errorMessages.PasswordOrEmail);
    }

    const isEqual = await bcrypt.compare(password, admin.password);

    if (!isEqual) {
      console.error("\x1b[31m", " 👎👎👎 : password not found");
      throw throwError(errorMessages.PasswordOrEmail);
    }
    const token = jwt.sign(
      { adminId: admin._id.toString(), loginType: "admin" },
      "jwt secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token: token });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let { active } = req.query;
    active = JSON.parse(active);

    const user = await User.findById(userId);

    if (!user) {
      throw throwError(errorMessages.UserNotFound);
    }
    user.active = active;
    await user.save();
    res.status(201).json({
      message: "user's status updated",
      userId: user._id.toString(),
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};
