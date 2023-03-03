const Product = require("../models/product");
const mongodb = require("mongodb");
const fileHelper = require("../utils/file");
const { validationResult } = require("express-validator/check");

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAddProduct = (request, response, nextMiddleware) => {
  if (!request.session.isLoggedIn) {
    return response.redirect("/login");
  }
  // send allow us to send anything of type anything
  response.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const image = request.file;
  const price = request.body.price;
  const description = request.body.description;
  const _id = request.body.productId;

  console.log("\x1b[35m", "👉👉👉 image :", image);

  if (!image) {
    return response.status(422).render("admin/edit-product", {
      docTitle: `Add Product`,
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        description: description,
        price: price,
        _id: _id,
      },
      errorMessage: "Attached file is not an image.",
      validationErrors: [],
    });
  }

  const imageUrl = image.path;

  const product = new Product({
    title,
    description,
    price,
    imageUrl,
    userId: request.user,
  });

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).render("admin/edit-product", {
      docTitle: `Add Product`,
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: request.body.title,
        description: request.body.description,
        price: request.body.price,
        _id: request.body.productId,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  product
    .save()
    .then((result) => {
      response.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAdminProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate("userId", "name  email")
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Products",
        path: "/admin/products",
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

exports.getEditProduct = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  const editMode = request.query.edit === "true" ? true : false;
  const { productId } = request.params;
  if (!editMode) {
    return response.redirect("/");
  }
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return response.redirect("/");
      }
      response.render("admin/edit-product", {
        docTitle: `Edit Product-${productId}`,
        path: "/admin/edit-product",
        editing: editMode,
        hasError: false,
        product: product,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save().then((result) => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.deleteProduct = (request, response, nextMiddleware) => {
  const { productId } = request.params;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return nextMiddleware(new Error("Product not found on database"));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: productId, userId: request.user._id });
    })
    .then((result) => {
      response.status(200).json({
        message: "success",
      });
      // response.redirect("/admin/products");
    })
    .catch((err) => {
      return response.status(500).json({ message: "deleting product failed!!" });
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////
