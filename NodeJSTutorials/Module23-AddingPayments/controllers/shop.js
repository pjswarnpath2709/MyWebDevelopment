const Product = require("../models/product");
const Order = require("../models/orders");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const stripe = require('stripe')('sk_test_51Mcs7FSByrxs5j5Iy8Dr6NjFe3zaBPwu2rztExh0By1hyWZH6xM194aKe5bhDru8EKtjbPLPm4Sv8eI6ur8wW8Vq00FpugmmR6');


const ITEMS_PER_PAGE = 1;
//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getProducts = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  // to send data send it in key:value format

  let page = request.query.page || 1;

  page = Number(page);

  console.log("\x1b[36m", "👍👍👍", page);

  let totalItems;

  Product.find()
    .count()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      response.render("shop/product-list", {
        prods: products,
        docTitle: "Products",
        path: "/products",
        totalProducts: totalItems,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        currentPage: page,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

  //  nextMiddleware(); // allows us to go to next middleware
};

exports.getShop = (request, response, next) => {
  let page = request.query.page || 1;

  page = Number(page);

  console.log("\x1b[36m", "👍👍👍", page);

  let totalItems;

  Product.find()
    .count()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      response.render("shop/index", {
        prods: products,
        docTitle: "Shop",
        path: "/",
        totalProducts: totalItems,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        currentPage: page,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
        isAuthenticated: request.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
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
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
        isAuthenticated: request.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate() - this will not work fro now
    .then((user) => {
      const products = user.cart.items;
      let total = 0;
      products.forEach((p) => {
        total += p.quantity * p.productId.price;
      });
      res.render("shop/checkout", {
        path: "/checkout",
        docTitle: "Checkout",
        products: products,
        totalSum: total,
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  const token = req.body.stripeToken; // Using Express
  let totalSum = 0;

  req.user
    .populate("cart.items.productId")
    // .execPopulate() - this will not work fro now
    .then((user) => {

      user.cart.items.forEach(p => {
        totalSum += p.quantity * p.productId.price;
      });

      const products = user.cart.items.map((item) => {
        return {
          quantity: item.quantity,
          product: { ...item.productId._doc },
        };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      const charge = stripe.charges.create({
        amount: totalSum * 100,
        currency: 'usd',
        description: 'Demo Order',
        source: token,
        metadata: { order_id: result._id.toString() }
      });
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("no order found!!"));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized user"));
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text("INVOICE", {
        underline: true,
      });

      pdfDoc.fontSize(14).text(`+++++++++++++++++++++++++++++++++++++++++`);

      let totalPrice = 0;
      order.products.forEach((prod) => {
        pdfDoc
          .fontSize(14)
          .text(
            `${prod.product.title} -> ${prod.quantity} X $ ${prod.product.price}`
          );
        totalPrice += prod.quantity * prod.product.price;
      });

      pdfDoc.text(`+++++++++++++++++++++++++++++++++++++++++`);

      pdfDoc.fontSize(18).text("Total Price : $" + totalPrice.toFixed(2));

      pdfDoc.end();
      // fs.readFile(invoicePath, (err, fileContent) => {
      //   if (err) {
      //     return next(new Error(err));
      //   }
      //   res.setHeader("Content-type", "application/pdf");
      //   res.setHeader("Content-disposition", `inline; filename=${invoiceName}`);
      //   res.send(fileContent);
      // });

      // streaming the file
      // const file = fs.createReadStream(invoicePath);
      res.setHeader("Content-type", "application/pdf");
      res.setHeader("Content-disposition", `inline; filename=${invoiceName}`);

      // response is the writeable stream
      // file.pipe(res);
    })
    .catch((err) => {
      next(new Error(err));
    });
};
