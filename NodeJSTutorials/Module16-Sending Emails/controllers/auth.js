const crypto = require("crypto");

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

// let transporter = nodemailer.createTransport({
//   host: "smtp.sendgrid.net",
//   port: 587,
//   auth: {
//     user: "apikey",
//     pass: "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",
//   },
// });

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
        return transporter.sendMail({
          to: email,
          from: "pulkitmansarovar@gmail.com",
          subject: "Signup succeeded",
          html: "<h1>you successfully Signed Up!! </h1>",
        });
      }
    })
    .then((result) => {
      if (result) {
        console.log("\x1b[33m", "😤😫🤯 :", result);
        res.redirect("/login");
      }
    })
    .catch((err) =>
      console.error("\x1b[31m", " 👎👎👎 controllers@auth.js@124 :", err)
    );
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    docTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with email found");
          res.redirect("/reset");
          return;
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        if (!result) {
          return;
        }
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "pulkitmansarovar@gmail.com",
          subject: "PASSWORD RESET",
          html: `
          <p>You requested a password reset</p>
          <p>click this <a href='http://localhost:8000/reset/${token}'>link</a> to set a password.</p>
          `,
        });
      })
      .catch((err) => {
        console.error("\x1b[31m", " 👎👎👎 :", err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "new-password",
        docTitle: "New Password",
        errorMessage: message,
        userId: user.id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
      transporter.sendMail({
        to: resetUser.email,
        from: "pulkitmansarovar@gmail.com",
        subject: "PASSWORD UPDATED  SUCCESSFULLY",
        html: `
        <h1>Your Password had been successfully updated. please <a href="http://localhost:8000/login">login</a><h1>
        `,
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};
