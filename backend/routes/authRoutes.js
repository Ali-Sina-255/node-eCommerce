import express from "express";
const router = express.Router();
import controllers from "../controllers/index.js";

router.route("/").post(controllers.registerUser).get(controllers.getUsers);
router.route("/logout").post(controllers.logoutUser);
router.route("/login").post(controllers.authUser);
router
  .route("/profile")
  .get(controllers.getUserProfile)
  .put(controllers.updateUserProfile);

router
  .route("/:id")
  .delete(controllers.deleteUser)
  .get(controllers.getUserById)
  .put(controllers.updateUser);

export default router;
