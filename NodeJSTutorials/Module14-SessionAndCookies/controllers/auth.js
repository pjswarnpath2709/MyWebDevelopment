const User = require("../models/user");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // this data is lost after we send a response
  // req.isLoggedIn = true;

  User.findById("63e429364b24a2cffc421b5d")
    .then((user) => {
      // browser by-default sends cookies to every request
      req.session.isLoggedIn = true;

      // this will save a normal js object user (not the mongoose object)
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.error("\x1b[31m", " 👎👎👎 controllers@auth.js@24 :", err);
    res.redirect("/");
  });
};
