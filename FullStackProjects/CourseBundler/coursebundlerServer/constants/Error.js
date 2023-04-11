export const CourseErrors = {
  RequiredFieldsNotProvided: {
    message: "Please add all fields",
    statusCode: 400,
  },
  CourseNotFound: {
    message: "course not found ",
    statusCode: 404,
  },
};

export const UserErrors = {
  RequiredFieldsNotProvided: {
    message: "Please add all fields",
    statusCode: 400,
  },
  UserAlreadyExists: {
    message: "User already Exists",
    statusCode: 409,
  },
  IncorrectEmailOrPassword: {
    message: "Invalid email or password",
    statusCode: 401,
  },
  UserNotFound: {
    message: "user not found",
    statusCode: 404,
  },
  AlreadyPresentInPlaylist: {
    message: "item already present in playlist",
    statuscode: 409,
  },
};

export const AuthErrors = {
  NotLoggedIn: {
    message: "user not logged in",
    statusCode: 401,
  },
  PasswordNotMatch: {
    message: "old password does'nt match",
    statusCode: 401,
  },
  TokenInvalidOrExpired: {
    message: "token has been invalid or has been expired",
    statusCode: 401,
  },
};

export const PaymentErrors = {
  AdminNotAllowed: {
    message: "admin not allowed to create subscriptions",
    statusCode: 400,
  },
  AuthenticationFailed: {
    message: "payment method or payment not authenticated",
    statusCode: 401,
  },
};

export const OtherErrors = {
  RequiredFieldsNotProvided: {
    message: "Please add all fields",
    statusCode: 400,
  },
};
