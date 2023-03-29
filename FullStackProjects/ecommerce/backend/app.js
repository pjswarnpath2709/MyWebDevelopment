const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const config = require("dotenv").config;
config();

//////+++++++++++++++++++++++++++++++++++++++++//////

//imports
const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/orders");
const paymentRouter = require("./routes/payment");
const errorHandler = require("./middlewares/error");

//////+++++++++++++++++++++++++++++++++++++++++//////

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());

//////+++++++++++++++++++++++++++++++++++++++++//////

// routing logic

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

// Error Handler Middleware
app.use(errorHandler);

//////+++++++++++++++++++++++++++++++++++++++++//////

module.exports = app;
