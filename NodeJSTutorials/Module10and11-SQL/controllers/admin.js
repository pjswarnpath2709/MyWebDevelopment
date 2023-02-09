const Product = require("../models/product");

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAddProduct = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  response.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.postAddProduct = (request, response, nextMiddleware) => {
  // products.push({ title: request.body.title });
  const product = { ...request.body };

  // Product.create({
  //   title: product.title,
  //   description: product.description,
  //   price: product.price,
  //   imageUrl: product.imageUrl,
  //   userId: request.user.id,
  // })

  console.log("\x1b[36m", "👍👍👍", request);

  // special method added due to association
  request.user
    .createProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    })
    .then((result) => {
      response.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAdminProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getEditProduct = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  const editMode = request.query.edit === "true" ? true : false;
  const { productId } = request.params;
  if (!editMode) {
    return response.redirect("/");
  }
  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return response.redirect("/");
      }
      response.render("admin/edit-product", {
        docTitle: `Edit Product-${productId}`,
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

exports.postEditProduct = (request, response, nextMiddleware) => {
  const UpdatedProduct = {
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
    id: request.body.productId,
    imageUrl: request.body.imageUrl,
  };

  Product.findByPk(request.body.productId)
    .then((product) => {
      product.title = UpdatedProduct.title;
      product.description = UpdatedProduct.description;
      product.price = UpdatedProduct.price;
      product.imageUrl = UpdatedProduct.imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("\x1b[35m", "👉👉👉 result :", result);
      response.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.postDeleteProduct = (request, response, nextMiddleware) => {
  const { productId } = request.body;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("\x1b[35m", "👉👉👉 result :", result);
      response.redirect("/admin/products");
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};
