const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errors");
const path = require("path");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("imageUrl")
);

// statistically serving the images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/auth", authRoutes);

app.use("/", feedRoutes);

app.use(errorHandler.handleError);

mongoose
  .connect(
    "mongodb+srv://pulkit:pulkit@cluster0.03yuict.mongodb.net/tables?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("\x1b[36m", "👍👍👍 :  database connected");
    app.listen(8080);
  })
  .catch((err) => {
    console.error("\x1b[31m", "👎👎👎 : database not connected ", err);
  });
