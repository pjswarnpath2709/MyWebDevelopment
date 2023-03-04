const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const auth = require("./middlewares/auth");

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

app.use(bodyParser.json()); // application/json

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

// statistically serving the images
app.use("/images", express.static(path.join(__dirname, "images")));

// handling the CORS ERROR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(auth);

app.put("/post-image", (req, res, next) => {
  if (!req.isAuth) {
    throw new Error("Not Authenticated");
  }
  if (!req.file) {
    return res.status(200).json({ message: "No file provided!" });
  }

  if (req.body.oldPath) {
    require("./utils/file").clearImage(req.body.oldPath);
  }

  return res
    .status(201)
    .json({ message: "file stored", filePath: req.file.path });
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error Occurred!";
      const code = err.originalError.code || 500;
      return {
        message,
        data,
        status: code,
      };
    },
  })
);

app.use((error, req, res, next) => {
  console.error("\x1b[31m", " 👎👎👎 :", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    "mongodb+srv://pulkit:pulkit@cluster0.03yuict.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("\x1b[36m", "👍👍👍", "database connected");
    app.listen(8080);
  })
  .catch((err) => {
    console.error("\x1b[31m", " 👎👎👎 :", err);
  });
