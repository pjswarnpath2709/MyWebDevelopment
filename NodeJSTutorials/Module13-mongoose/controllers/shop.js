const Product = require("../models/product");
const Order = require("../models/orders");

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getProducts = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  // to send data send it in key:value format

  Product.find()
    .then((products) => {
      console.log("\x1b[35m", "👉👉👉 products@shop.js@11 :", products);
      response.render("shop/product-list", {
        prods: products,
        docTitle: "Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });

  //  nextMiddleware(); // allows us to go to next middleware
};

exports.getShop = (request, response, next) => {
  Product.find()
    .then((products) => {
      response.render("shop/index", {
        prods: products,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getProductDetails = (request, response, next) => {
  const { productId } = request.params;
  Product.findById(productId)
    .then((product) => {
      response.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        product: product,
      });
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate() - this will not work fro now
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Cart",
        products: products,
      });
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("\x1b[35m", "👉👉👉 result :", result);
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .removeFromCart(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getOrders = (request, response, next) => {
  Order.find({
    "user.userId": request.user._id,
  })
    .then((orders) => {
      response.render("shop/orders", {
        docTitle: "orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate() - this will not work fro now
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return {
          quantity: item.quantity,
          product: { ...item.productId._doc },
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};

//////+++++++++++++++++++++++++++++++++++++++++//////
