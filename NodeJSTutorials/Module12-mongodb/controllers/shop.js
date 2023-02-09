const Product = require("../models/product");
const { response } = require("express");

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getProducts = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  // to send data send it in key:value format

  Product.fetchAll()
    .then((products) => {
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

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Cart",
        products: products,
      });
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));

  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (let product of products) {
  //       const cartProductData = cart.products.find(
  //         (item) => item.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({
  //           productData: product,
  //           qty: cartProductData.qty,
  //         });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       docTitle: "Cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
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
    .deleteItemFromCart(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });

  // Product.findById(productId, (product) => {
  //   Cart.deleteProduct(productId, product.price);
  //   res.redirect("/cart");
  // });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getShop = (request, response, next) => {
  Product.fetchAll()
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
exports.getOrders = (request, response, next) => {
  request.user
    .getOrders()
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
    .addOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
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
