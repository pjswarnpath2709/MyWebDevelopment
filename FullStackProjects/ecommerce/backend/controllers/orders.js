const Order = require("../models/orders");
const Product = require("../models/product");
const User = require("../models/user");
const { ErrorHandler, errorMessages } = require("../utils/errorHandler");

//////********************************//////

// create new Order
exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingPrice,
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "order placed successfully",
      order,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

// get Single Order
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      throw new ErrorHandler(errorMessages.OrderNotFound);
    }
    res.status(200).json({
      success: true,
      message: "order fetched",
      order,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

// get logged In user Orders
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "orders fetched",
      orders,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

// get all orders --Admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    const totalAmount = orders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      message: "orders fetched",
      totalAmount,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

//////********************************//////

// update order status --Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new ErrorHandler(errorMessages.OrderNotFound);
    }

    if (order.orderStatus === "Delivered") {
      throw new ErrorHandler(errorMessages.OrderAlreadyDelivered);
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(
        async (order) =>
          await updateStock({
            quantity: order.quantity,
            productId: order.product,
          })
      );
    }

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "order status changed successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateStock = async ({ quantity, productId }) => {
  const product = await Product.findById(productId);
  const stock = product.stock - quantity;
  if (stock < 0) {
    return;
  }
  product.stock = stock;
  await product.save({ validateBeforeSave: false });
};

//////********************************//////

// delete Order
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new ErrorHandler(errorMessages.OrderNotFound);
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "order deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
