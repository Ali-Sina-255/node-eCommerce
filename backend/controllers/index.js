import { getProducts, getProduct } from "./productController.js";
import {
  registerUser,
  authUser,
  getUserProfile,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
  getUsers,
  updateUserProfile,
} from "./authController.js";
import {
  createOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "./OrderController.js";
export default {
  // Product controllers
  getProducts,
  getProduct,

  // Auth controllers
  registerUser,
  authUser,
  getUsers,
  getUserProfile,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
  updateUserProfile,
  // orders

  createOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
