const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shippingInfoSchema = new Schema({
  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  city: {
    type: String,
    required: [true, "Please Enter Your City"],
  },
  state: {
    type: String,
    required: [true, "Please Enter Your State"],
  },
  country: {
    type: String,
    required: [true, "Please Enter Your Country"],
  },
  pinCode: {
    type: Number,
    required: [true, "Please Enter Your PinCode"],
  },
  phoneNo: {
    type: Number,
    required: [true, "Please Enter Your Phone Number"],
  },
});

const orderItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const paymentInfoSchema = new Schema({
  id: { type: String, required: true },
  status: { type: String, required: true },
});

const orderSchema = new Schema(
  {
    shippingInfo: shippingInfoSchema,
    orderItems: [orderItemSchema],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    paymentInfo: paymentInfoSchema,
    paidAt: { type: Date, required: true },
    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered"],
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
