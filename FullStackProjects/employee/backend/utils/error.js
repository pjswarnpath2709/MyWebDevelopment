exports.throwError = ({ message = "internal server error", status = 500 }) => {
  const error = new Error(message);
  error.statusCode = status;
  return error;
};

exports.errorMessage = {
  EmployeeNotFound: {
    message: "Employee not found",
    status: 404,
  },
};

exports.setDefaultStatus = (err) => {
  err.statusCode = err.statusCode ?? 500;
};
