class ErrorHandler extends Error {
  constructor({ message, statusCode }) {
    super(message);
    this.statusCode = statusCode ?? 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorMessages = {
  ProductNotFound: {
    message: "Product not found",
    statusCode: 404,
  },
  UserNotFound: {
    message: "Invalid Email or Password",
    statusCode: 404,
  },
  UserDoesNotExists(userId) {
    return {
      message: `User does not exists with id : ${userId}`,
      statusCode: 404,
    };
  },
  UserWithEmailNotFound: {
    message: "User not found",
    statusCode: 404,
  },
  UnAuthorized: {
    message: "Unauthorized , Please Login to Access this resource",
    statusCode: 401,
  },
  EmailAndPasswordNotGiven: {
    message: "Please Enter Email and Password",
    statusCode: 400,
  },
  ResetPasswordTokenInvalidOrExpired: {
    message: "Reset Password Token is invalid or has been Expired",
    statusCode: 400,
  },
  PasswordNotMatch: {
    message: "Password Does not Match",
    statusCode: 400,
  },
  OldPasswordMistMatched: {
    message: "Old password is Mismatched , please enter correct password",
    statusCode: 400,
  },
  OrderNotFound: {
    message: "Order not Found",
    statusCode: 404,
  },
  OrderAlreadyDelivered: {
    message: "Order already has been delivered",
    statusCode: 400,
  },
};

module.exports = { ErrorHandler, errorMessages };
