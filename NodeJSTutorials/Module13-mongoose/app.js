const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const User = require("./models/user");

//////-------------------------------------------------------------------------------------------------------------------------------//////

// acting like a requestListener
const app = express();

//////+++++++++++++++++++++++++++++++++++++++++//////

// setting the configuration for the template engines
app.set("view engine", "ejs");

// where to find these templates
app.set("views", "views");

//////+++++++++++++++++++++++++++++++++++++++++//////

//////+++++++++++++++++++++++++++++++++++++++++//////

// adding the parser
// registers a middleware that will parse our body parsing

app.use(bodyParser.urlencoded({ extended: false }));

// handled by the static middleware , grant read access to the public directory
app.use(express.static(path.join(__dirname, "public")));

// storing the users in all the request for authentication purposes
app.use((req, res, next) => {
  User.findById("63e429364b24a2cffc421b5d")
    .then((user) => {
      // this will return a full mongoose model , so we can call all the functions on this model
      req.user = user;
      next();
    })
    .catch((err) => console.log("\x1b[36m", "👍👍👍", err));
});

//////+++++++++++++++++++++++++++++++++++++++++//////

// using the admin routes from another file
// it is not a function it's an Object
// applying extra filter on the admin route
app.use("/admin", adminRoutes);

//////+++++++++++++++++++++++++++++++++++++++++//////

app.use(shopRoutes);

//////+++++++++++++++++++++++++++++++++++++++++//////

// handling errors , sending back 404
const { pageNotFound } = require("./controllers/error");
app.use(pageNotFound);

//////+++++++++++++++++++++++++++++++++++++++++//////

mongoose
  .connect(
    "mongodb+srv://pulkit:pulkit@cluster0.03yuict.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "pulkit",
          email: "pulkit@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(8000);
  })
  .catch((err) => console.error("\x1b[31m", " 👎👎👎 app.js@93 : ", err));
