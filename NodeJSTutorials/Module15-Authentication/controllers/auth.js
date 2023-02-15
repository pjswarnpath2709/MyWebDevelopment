const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  // this data is lost after we send a response
  // req.isLoggedIn = true;

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((isMatching) => {
          if (isMatching) {
            // browser by-default sends cookies to every request
            req.session.isLoggedIn = true;

            // this will save a normal js object user (not the mongoose object)
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          } else {
            req.flash("error", "Invalid email or password");
            return res.redirect("/login");
          }
        })
        .catch((err) => {
          console.error("\x1b[31m", " 👎👎👎 controllers@auth.js@25 : ", err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.error("\x1b[31m", " 👎👎👎 controllers@auth.js@51 :", err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? message[0] : null;

  res.render("auth/signup", {
    path: "/signup",
    docTitle: "Signup",
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email already exists already!!");
        res.redirect("/signup");
        return;
      }
      return bcrypt.hash(password, 12).then((password) => {
        const user = new User({
          email,
          password,
          cart: {
            items: [],
          },
        });
        return user.save();
      });
    })
    .then((result) => {
      if (result) {
        res.redirect("/login");
      }
    })
    .catch((err) =>
      console.error("\x1b[31m", " 👎👎👎 controllers@auth.js@75 :", err)
    );
};
