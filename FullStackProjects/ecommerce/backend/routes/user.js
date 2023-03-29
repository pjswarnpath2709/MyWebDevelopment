const userRouter = require("express").Router();
const userController = require("../controllers/user");
const { isAuth, authorizationRoles } = require("../middlewares/auth");

userRouter.route("/register").post(userController.registerUser);

userRouter.route("/login").post(userController.loginUser);

userRouter.route("/password/forgot").post(userController.forgotPassword);

userRouter.route("/password/reset/:token").put(userController.resetPassword);

userRouter.route("/logout").get(userController.logout);

userRouter.route("/me").get(isAuth, userController.getUserDetails);

userRouter
  .route("/password/update")
  .put(isAuth, userController.updateUserPassword);

userRouter.route("/me/update").put(isAuth, userController.updateUserProfile);

userRouter
  .route("/admin/users")
  .get(isAuth, authorizationRoles("admin"), userController.getAllUsers);

userRouter
  .route("/admin/user/:id")
  .get(isAuth, authorizationRoles("admin"), userController.getSingleUser)
  .delete(isAuth, authorizationRoles("admin"), userController.deleteUser)
  .put(isAuth, authorizationRoles("admin"), userController.updateUserRole);

module.exports = userRouter;
