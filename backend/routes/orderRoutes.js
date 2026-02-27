import express from "express";
const router = express.Router();
import controllers from "../controllers/index.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(controllers.getOrders)
  .post(protect, controllers.createOrderItems);
router.route("/mine").get(protect, controllers.getMyOrders);
router.route("/:id").get(protect, controllers.getOrderById);
router.route("/:id/pay").put(protect, admin, controllers.updateOrderToPaid);
router
  .route("/:id/delivered")
  .put(protect, admin, controllers.updateOrderToDelivered);
export default router;
