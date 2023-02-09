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
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const OrderItem = require("./models/order-item");
const Order = require("./models/order");

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
  User.findByPk(1)
    .then((user) => {
      // it is because whenever we want to access user we can directly access it from the request
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

//////-------------------------------------------------------------------------------------------------------------------------------//////

// many to one
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// one to one
User.hasOne(Cart);
Cart.belongsTo(User);

// many to many
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// one to many
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

//////-------------------------------------------------------------------------------------------------------------------------------//////

// see all the models and create tables

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "pulkit", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    //////********************************//////
    return user.createCart();

    //////********************************//////
  })
  .then((cart) => {
    // const server = http.createServer(app);
    // server.listen(8000);
    app.listen(8000); // short-form for above lines
  })
  .catch((err) => {
    console.error("\x1b[31m", " 👎👎👎 err :", err);
  });

//////-------------------------------------------------------------------------------------------------------------------------------//////
