const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// blueprint of the data we want to store
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // use the name of the model which we want to relate to
    required: true,
  },
});

// we will export a model
module.exports = mongoose.model("Product", productSchema);
