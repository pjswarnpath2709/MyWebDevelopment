const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const app = express();
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const exp = require("constants");

// adding the parser
// done at the beginning because we want to parse our request all the time
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// .use() makes the middleware and allows are request to hold until it's passes to a funnel

// middleware 1
// app.use(function (req, res, next) {
//   console.log("In the middleware!");
//   next(); // allows the request to go to next middleware
// });
app.use("/admin", adminRoutes);
// this middleware is made to write first because the filtering is done like
// url starting with "/"
// middleware 2
app.use(shopRoutes);

// catch error middleware
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// const server = http.createServer(app);

// server.listen(3000);

// the lines written above can be written as this in the express.js framework
app.listen(3000);
