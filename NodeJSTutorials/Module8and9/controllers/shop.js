const Product = require("../models/product");
const Cart = require("../models/cart");
const { response } = require("express");

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getProducts = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  // to send data send it in key:value format

  Product.fetchAll((products) => {
    response.render("shop/product-list", {
      prods: products,
      docTitle: "Products",
      path: "/products",
    });
  });

  //  nextMiddleware(); // allows us to go to next middleware
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (item) => item.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getShop = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop/index", {
      prods: products,
      docTitle: "Products",
      path: "/",
    });
  });
};

//////+++++++++++++++++++++++++++++++++++++++++//////
exports.getOrders = (request, response, next) => {
  response.render("shop/orders", {
    docTitle: "orders",
    path: "/orders",
  });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getCheckout = (request, response, next) => {
  response.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};

//////+++++++++++++++++++++++++++++++++++++++++//////
exports.getProductDetails = (request, response, next) => {
  const { productId } = request.params;
  Product.findById(productId, (product) => {
    response.render("shop/product-detail", {
      docTitle: product.id,
      path: "/products",
      product,
    });
  });
};

//////+++++++++++++++++++++++++++++++++++++++++//////
