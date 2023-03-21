require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorHandler = require("./middlewares/errors");
const employeeRoutes = require("./routes/employee");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/employee", employeeRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_STRING)
  .then((result) => {
    console.log("\x1b[36m", "👍👍👍", "database connected");
    app.listen(process.env.PORT, () => {
      console.log("\x1b[36m", "👍👍👍", "server started");
    });
  })
  .catch((error) => {
    console.error("\x1b[31m", " 👎👎👎 :", error);
  });
