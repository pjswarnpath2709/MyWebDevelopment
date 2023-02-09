const http = require("http");
const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");
const bodyParser = require("body-parser");

// handlebars engines
// const { engine } = require("express-handlebars");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const { mongoConnect } = require("./utils/database");
const User = require("./models/user");

//////-------------------------------------------------------------------------------------------------------------------------------//////

// acting like a requestListener
const app = express();

//////+++++++++++++++++++++++++++++++++++++++++//////

// app.engine(
//   "hbs",
//   engine({
//     extname: "hbs",
//     defaultLayout: "main-layout",
//     layoutsDir: "views/layouts/",
//   })
// );

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
  User.findById("63e3c9cfa5e2c344e0894f40")
    .then((user) => {
      req.user = new User({ ...user, username: user.name });
      next();
    })
    .catch((err) => console.log("\x1b[36m", "👍👍👍", err));
  //next();
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

mongoConnect(() => {
  app.listen(8000);
});
