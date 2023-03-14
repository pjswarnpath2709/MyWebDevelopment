const jwt = require("jsonwebtoken");
const { throwError, errorMessages } = require("../utils/errors");
const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw throwError(errorMessages.Unauthorized);
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "jwt secret");
  } catch (err) {
    err.status = 500;
    throw err;
  }
  if (!decodedToken) {
    next(throwError(errorMessages.Unauthorized));
  }
  if (decodedToken.loginType === "user") {
    req.loginType = "user";
    req.userId = decodedToken.userId;
  } else if (decodedToken.loginType === "admin") {
    req.loginType = "admin";
    req.adminId = decodedToken.adminId;
  } else {
    next(throwError(errorMessages.Unauthorized));
  }
  next();
};

module.exports = isAuth;
