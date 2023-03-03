const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Failed.");
      error.statusCode = 422;
      error.data = errors;
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const hashedPassword = bcrypt.hash(password, 12);

    const user = new User({
      email,
      name,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
      message: "User created",
      userId: user._id,
    });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let loadedUser;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("A user with this email could not be found");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    // generate new JWT , this JWT is associated with every request
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token: token, userId: user._id.toString() });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

exports.getUserStatus = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ status: user.status });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUserStatus = (req, res, next) => {
  const newStatus = req.body.status;
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "User updated." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
