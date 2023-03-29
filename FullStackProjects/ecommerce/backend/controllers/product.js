const Product = require("../models/product");
const ApiFeatures = require("../utils/apiFeatures");
const { errorMessages, ErrorHandler } = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;

//////********************************//////

// create a product , only admin can create products
exports.createProduct = async (req, res, next) => {
  try {
    req.body.creator = req.user._id;

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        imageUrl: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      message: `product ${product._id} created at ${product.createdAt}`,
      success: true,
      product: product._doc,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new ErrorHandler(errorMessages.ProductNotFound);
    }
    res.status(200).json({
      success: true,
      message: `${product._id} fetched successfully`,
      product: product._doc,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

// get all products
exports.getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "all products fetched",
      products,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

// get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const resultsPerPage = 8;

    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures({
      query: Product.find(),
      requestQuery: req.query,
    })
      .search()
      .filter();

    let products = await apiFeatures.query;

    const filteredProductsCount = products.length;

    apiFeatures.pagination(resultsPerPage);

    products = await apiFeatures.query.clone();
    res.status(200).json({
      success: true,
      message: "all products fetched",
      products,
      productsCount,
      resultsPerPage,
      filteredProductsCount,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

//update a product
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      throw new ErrorHandler(errorMessages.ProductNotFound);
    }

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      // deleting images from cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "products",
        });
        imagesLinks.push({
          public_id: result.public_id,
          imageUrl: result.secure_url,
        });
      }
      req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      message: `updated ${product._id} at ${product.updatedAt}`,
      success: true,
      product: product._doc,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ErrorHandler(errorMessages.ProductNotFound);
    }

    // deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: `product ${product._id} deleted at ${product.updatedAt}`,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////
// create product review and also update it
exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewedIndex = product.reviews.findIndex(
      (rev) => rev.user._id.toString() === req.user._id.toString()
    );

    if (isReviewedIndex >= 0) {
      // then update the existing review
      product.reviews[isReviewedIndex].rating = review.rating;
      product.reviews[isReviewedIndex].comment = review.comment;
    } else {
      // create and push new review
      product.reviews.push(review);
    }

    await product.save({
      validateBeforeSave: false,
    });
    res.status(200).json({
      success: true,
      message: "review generated successfully",
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

exports.getAllReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorHandler(errorMessages.ProductNotFound);
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
      message: "Product fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

exports.deleteReview = async (req, res, next) => {
  try {
    const { reviewId, productId } = req.query;
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorHandler(errorMessages.ProductNotFound);
    }

    const filteredReviews = product.reviews.filter(
      (rev) => rev._id.toString() !== reviewId.toString()
    );

    product.reviews = filteredReviews;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "deleted review",
    });
  } catch (err) {
    next(err);
  }
};
