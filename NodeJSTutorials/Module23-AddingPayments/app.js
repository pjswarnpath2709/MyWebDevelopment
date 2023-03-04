const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const isAuth = require("./middlewares/is-auth");
const { postOrder } = require("./controllers/shop");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const csurf = require("csurf");
const https = require("https");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.03yuict.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
//////-------------------------------------------------------------------------------------------------------------------------------//////

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

const authRoutes = require("./routes/auth");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const User = require("./models/user");

//////-------------------------------------------------------------------------------------------------------------------------------//////

// acting like a requestListener
const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(helmet());
app.use(compression());
app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);

const privateKey = fs.readFileSync("server.key");
const certificate = fs.readFileSync("server.cert");

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// to protect site from csrf attacks
const csrfProtection = csurf();

const fileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "images");
  },
  filename: (req, file, callBack) => {
    callBack(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    fileStorage.mimetype === "image/jpg"
  ) {
    callBack(null, true);
  } else {
    callBack(null, false);
  }
};

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

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// handled by the static middleware , grant read access to the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// registering the session middleware
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

// storing the users in all the request for authentication purposes
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

// automatically send this to every page
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

//////+++++++++++++++++++++++++++++++++++++++++//////

app.post("/create-order", isAuth, postOrder);

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);

//////********************************//////

// using the admin routes from another file
// it is not a function it's an Object
// applying extra filter on the admin route

app.use("/admin", adminRoutes);

//////+++++++++++++++++++++++++++++++++++++++++//////

app.use(shopRoutes);

//////+++++++++++++++++++++++++++++++++++++++++//////

// handling errors , sending back 404
const { pageNotFound, get500 } = require("./controllers/error");
app.get("/500", get500);
app.use(pageNotFound);

app.use((error, req, res, next) => {
  console.error("\x1b[31m", " 👎👎👎 :", error);
  res.redirect("/500");
});

//////+++++++++++++++++++++++++++++++++++++++++//////

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    // https
    //   .createServer(
    //     {
    //       key: privateKey,
    //       cert: certificate,
    //     },
    //     app
    //   )
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.error("\x1b[31m", " 👎👎👎 app.js@93 : ", err));
