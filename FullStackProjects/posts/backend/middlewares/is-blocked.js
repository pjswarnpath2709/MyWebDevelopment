const User = require("../models/user");
const {
  throwError,
  errorMessages,
  setDefaultStatus,
} = require("../utils/errors");

const isBlocked = async (req, res, next) => {
  try {
    if (req.loginType == "user") {
      const user = await User.findById(req.userId);
      if (user.active) {
        return next();
      } else {
        throw throwError(errorMessages.UserIsBlocked);
      }
    } else {
      return next();
    }
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

module.exports = isBlocked;
