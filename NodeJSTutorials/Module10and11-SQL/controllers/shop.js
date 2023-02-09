const Product = require("../models/product");
const { response } = require("express");

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getProducts = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  // to send data send it in key:value format

  Product.findAll()
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
    .then((cart) => cart.getProducts())
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
  let fetchedCart;
  let newQty = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({
        where: {
          id: productId,
        },
      });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQty = product.cartItem.quantity;
        newQty = oldQty + 1;
        return product;
      } else {
        return Product.findByPk(productId);
      }
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQty,
        },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({
        where: {
          id: productId,
        },
      });
    })
    .then((products) => {
      return products[0];
    })
    .then((product) => {
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :");
    });

  // Product.findById(productId, (product) => {
  //   Cart.deleteProduct(productId, product.price);
  //   res.redirect("/cart");
  // });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getShop = (request, response, next) => {
  Product.findAll()
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
    .getOrders({ include: ['products'] })
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
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = {
                quantity: product.cartItem.quantity,
              };
              return product;
            })
          );
        })
        .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};

//////+++++++++++++++++++++++++++++++++++++++++//////
exports.getProductDetails = (request, response, next) => {
  const { productId } = request.params;
  Product.findByPk(productId)
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
