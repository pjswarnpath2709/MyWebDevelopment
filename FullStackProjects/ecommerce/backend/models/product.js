const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  public_id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    price: {
      type: Number,
      require: [true, "Please Enter the Price"],
      maxLength: [8, "Price cannot exceed 8 Characters"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [imageSchema],
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxLength: [4, "Stock cannot Exceed 4 characters"],
      default: 1,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  if (!this.isModified("reviews")) {
    next();
  }
  this.numberOfReviews = this.reviews.length;
  this.ratings =
    this.ratings.length > 0
      ? this.reviews.reduce((acc, item) => acc + item.rating, 0) /
        this.reviews.length
      : 0;
});

module.exports = mongoose.model("Product", productSchema);
