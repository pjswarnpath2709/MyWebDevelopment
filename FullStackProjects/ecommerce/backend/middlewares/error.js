const { ErrorHandler } = require("../utils/errorHandler");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode ?? 500;
  err.message = err.message ?? "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not Found. Invalid ${err.path}`;
    err = new ErrorHandler({ message: message, statusCode: 404 });
  }

  // Mongoose Duplicate Key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered `;
    err = new ErrorHandler({ message: message, statusCode: 404 });
  }

  // Wrong JWT token error
  if (err.name === "JsonWebTokenError") {
    const message = `JSONWEBTOKEN is invalid, Try again!`;
    err = new ErrorHandler({ message: message, statusCode: 400 });
  }

  // JWT expire Error
  if (err.name === "TokenExpiredError") {
    const message = `JSONWEBTOKEN expired , login again!`;
    err = new ErrorHandler({ message: message, statusCode: 400 });
  }

  res.status(err.statusCode).json({
    success: false,
    message: "An error has occurred",
    errorMessage: err.message,
  });
  console.log("\x1b[33m", "😤😫🤯 :", err);
};

module.exports = errorHandler;
