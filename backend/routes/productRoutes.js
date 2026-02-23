import express from "express";
const router = express.Router();

import controllers from "../controllers/index.js";
router.get("/", controllers.getProducts);
router.get("/:id", controllers.getProduct);

export default router;
