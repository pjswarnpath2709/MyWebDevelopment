const router = require("express").Router();
const Admin = require("../models/admin");

const adminController = require("../controllers/admin");

const { body } = require("express-validator/check");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom(async (value) => {
        if (value.split["@"][1] !== "admin.com") {
          return Promise.reject("entered email does not belongs to an admin");
        }
      })
      .withMessage("please enter a valid email")
      .custom(async (value) => {
        const userDoc = await Admin.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("Email already exists");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({
      min: 5,
    }),
    body("name").trim().not().isEmpty(),
  ],
  adminController.signup
);

router.post("/login", adminController.login);

router.put("/status/:userId", adminController.updateStatus);

module.exports = router;
