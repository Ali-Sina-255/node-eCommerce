import express from "express";
import dotenv from "dotenv";

import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;

// static product

import products from "./data/products.js";

app.get("/api/products", (req, res) => res.json(products));
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
