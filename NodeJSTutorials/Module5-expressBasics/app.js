const http = require("http");
const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");
const bodyParser = require("body-parser");

// handlebars engines
// const { engine } = require("express-handlebars");

//////-------------------------------------------------------------------------------------------------------------------------------//////

const adminData = require("./routes/admin");

const shopRoutes = require("./routes/shop");

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
// adding the parser
// registers a middleware that will parse our body parsing
app.use(bodyParser.urlencoded({ extended: false }));

// handled by the static middleware , grant read access to the public directory
app.use(express.static(path.join(__dirname, "public")));
//////+++++++++++++++++++++++++++++++++++++++++//////

// using the admin routes from another file
// it is not a function it's an Object
// applying extra filter on the admin route
app.use("/admin", adminData.routes);

//////+++++++++++++++++++++++++++++++++++++++++//////

app.use(shopRoutes);

//////+++++++++++++++++++++++++++++++++++++++++//////

// handling errors , sending back 404
app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Page not found" });
});

//////+++++++++++++++++++++++++++++++++++++++++//////

// const server = http.createServer(app);
// server.listen(8000);
app.listen(8000); // short-form for above lines
