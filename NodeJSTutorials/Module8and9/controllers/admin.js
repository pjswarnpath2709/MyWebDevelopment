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
  const product = new Product({ ...request.body, id: null });
  product.save();
  return response.redirect("/products");
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Products",
      path: "/admin/products",
    });
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
  Product.findById(productId, (product) => {
    if (!product) {
      return response.redirect("/");
    }
    response.render("admin/edit-product", {
      docTitle: `Edit Product-${productId}`,
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (request, response, nextMiddleware) => {
  const product = new Product({
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
    id: request.body.productId,
    imageUrl: request.body.imageUrl,
  });
  product.save();
  return response.redirect("/admin/products");
};

//////+++++++++++++++++++++++++++++++++++++++++//////

exports.postDeleteProduct = (request, response, nextMiddleware) => {
  const { productId } = request.body;
  Product.deleteById(productId);
  return response.redirect("/admin/products");
};
