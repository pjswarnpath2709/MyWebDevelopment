const router = require("express").Router();
const { body } = require("express-validator/check");

const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({
      min: 5,
    }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/googleLogin", authController.googleLogin);

router.post("/googleSignup", authController.googleSignup);

router.post("/login", authController.login);

module.exports = router;
