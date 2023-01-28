const Product = require("../models/product");

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAddProduct = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  response.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.postAddProduct = (request, response, nextMiddleware) => {
  // products.push({ title: request.body.title });
  const product = new Product(request.body.title);
  product.save();
  response.redirect("/");
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getProducts = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  // to send data send it in key:value format

  Product.fetchAll((products) => {
    response.render("shop", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      activeShop: true,
      activeAddProduct: false,
      productCss: true,
      formCSS: true,
    });
  });

  //  nextMiddleware(); // allows us to go to next middleware
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.pageNotFound = (req, res, next) => {
  res.status(404).render("404", { docTitle: "Page not found", path: "/" });
};

//////+++++++++++++++++++++++++++++++++++++++++//////
