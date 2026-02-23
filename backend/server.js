import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();
app.use(cors());

import router from "./routes/index.js";
// static product

app.use("/api/products", router.productRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
