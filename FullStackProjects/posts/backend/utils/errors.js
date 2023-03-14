exports.throwError = ({ message, status }) => {
  const error = new Error(message);
  error.status = status;
  error.errorMessage = message;
  return error;
};

exports.setDefaultStatus = (err) => {
  err.status = err.status ? err.status : 500;
};

exports.errorMessages = {
  Unauthorized: {
    message: "Not Authorized",
    status: 401,
  },
  UserNotFound: {
    message: "User not found",
    status: 404,
  },
  PasswordOrEmail: {
    message: "Password or email not correct!",
    status: 401,
  },
  CommentNotFound: {
    message: "Comment not found",
    status: 404,
  },
  PostNotFound: {
    message: "Post not found",
    status: 404,
  },
  PostsNotFound: {
    message: "Posts not found",
    status: 404,
  },
  PostNotUpdated: {
    message: "Post update failed",
    status: 403,
  },
  LikeNotUpdated: {
    message: "Like on the Post not updated",
    status: 403,
  },
  UserIsBlocked: {
    message: "User is blocked",
    status: 401,
  },
  ValidationFailed: {
    message: "Validation failed for post request",
    status: 403,
  },
};
