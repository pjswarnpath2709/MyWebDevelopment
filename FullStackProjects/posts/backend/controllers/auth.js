const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  throwError,
  errorMessages,
  setDefaultStatus,
} = require("../utils/errors");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      signupType: "normal",
      password: hashedPw,
    });
    await user.save();
    res.status(200).json({
      userId: user._id.toString(),
      message: "user created",
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

//todo : implement google login and signup
exports.googleSignup = async (req, res, next) => {
  try {
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

//todo : implement google login and signup
exports.googleLogin = async (req, res, next) => {
  try {
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      console.error("\x1b[31m", " 👎👎👎 : user not found");
      throw throwError(errorMessages.PasswordOrEmail);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      console.error("\x1b[31m", " 👎👎👎 : password not found");
      throw throwError(errorMessages.PasswordOrEmail);
    }

    const token = jwt.sign(
      { userId: user._id.toString(), loginType: "user" },
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
