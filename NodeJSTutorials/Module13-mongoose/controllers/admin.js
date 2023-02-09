const Product = require("../models/product");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAddProduct = (request, response, nextMiddleware) => {
  // send allow us to send anything of type anything
  response.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (request, response, nextMiddleware) => {
  // products.push({ title: request.body.title });

  const product = new Product({ ...request.body, userId: request.user });
  // special method added due to association
  product
    .save()
    .then((result) => {
      response.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
    });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAdminProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate("userId", "name  email")
    .then((products) => {
      console.log(
        "\x1b[35m",
        "👉👉👉 products@controllers/admin.js/37 :",
        products
      );
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
  Product.findById(productId)
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
    id: new ObjectId(request.body.productId),
    imageUrl: request.body.imageUrl,
  };

  Product.findById(request.body.productId)
    .then((product) => {
      // if we call save on existing object , it will be updated,
      // changes will be over-written
      product.title = UpdatedProduct.title;
      product.description = UpdatedProduct.description;
      product.price = UpdatedProduct.price;
      product.imageUrl = UpdatedProduct.imageUrl;
      return product.save();
    })
    .then((result) => {
      response.redirect("/admin/products");
    })
    .catch((err) =>
      console.error("\x1b[31m", " 👎👎👎  controllers/admin.js@82 : ", err)
    );
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.postDeleteProduct = (request, response, nextMiddleware) => {
  const { productId } = request.body;
  Product.findByIdAndRemove(productId)
    .then((result) => {
      response.redirect("/admin/products");
    })
    .catch((err) => console.error("\x1b[31m", " 👎👎👎 :", err));
};
