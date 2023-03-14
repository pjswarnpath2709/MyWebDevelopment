exports.handleError = (error, req, res, next) => {
  console.error("\x1b[31m", " 👎👎👎 :", error);
  res
    .status(error.status)
    .json({ status: error.status, message: error.errorMessage });
};
