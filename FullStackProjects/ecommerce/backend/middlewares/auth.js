const { ErrorHandler, errorMessages } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new ErrorHandler(errorMessages.UnAuthorized);
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    if (!userId) {
      throw new ErrorHandler(errorMessages.UnAuthorized);
    }

    req.user = await User.findById(userId);

    next();
  } catch (err) {
    next(err);
  }
};

const authorizationRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role.toLowerCase())) {
        throw new ErrorHandler({
          message: `Role : ${req.user.role} is not allowed to access this resource`,
          statusCode: 403,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { isAuth, authorizationRoles };
