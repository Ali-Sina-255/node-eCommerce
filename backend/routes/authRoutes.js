import express from "express";
const router = express.Router();
import controllers from "../controllers/index.js";
import { admin, protect } from "../middleware/authMiddleware.js";
router
  .route("/")
  .post(controllers.registerUser)
  .get(protect, admin, controllers.getUsers);
router.route("/logout").post(controllers.logoutUser);
router.route("/login").post(controllers.authUser);
router
  .route("/profile")
  .get(protect, admin, controllers.getUserProfile)
  .put(protect, admin, controllers.updateUserProfile);

router
  .route("/:id")
  .delete(controllers.deleteUser)
  .get(controllers.getUserById)
  .put(controllers.updateUser);

export default router;
