import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc  Create new order
// @route POST /api/orders
// @access Private
const createOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress, // Changed from 'shipping' to 'shippingAddress' to match schema
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    // Fixed: == to ===
    res.status(400);
    throw new Error("No order items found");
  } else {
    const order = new Order({
      user: req.user._id, // Added user from auth middleware
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id || x.id, // Handle both _id and id
        _id: undefined, // Remove _id to let MongoDB generate new one
      })),
      shippingAddress, // Fixed: changed from 'shipping' to 'shippingAddress'
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save(); // Fixed: sav() to save()

    res.status(201).json(createdOrder);
  }
});

// @desc  Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc  Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  ); // Fixed: populate syntax

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found"); // Fixed: message
  }
});

// @desc  Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Get all orders (admin)
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  createOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
