import express from "express";
const router = express.Router();

import products from "../data/products.js";

router.get("/", (req, res) => res.json({ products }));
router.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
