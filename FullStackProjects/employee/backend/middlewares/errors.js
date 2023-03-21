const errorHandler = (error, req, res, next) => {
  if (error) {
    console.error("\x1b[31m", " 👎👎👎 :", error);
    res.status(error.statusCode).json({
      message: "An error has occurred",
      errorMessage: error.message,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
