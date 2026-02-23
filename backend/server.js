import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// routers
import router from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();
app.use(cors());

app.use("/api/products", router.productRouter);

// Error middleware - THESE MUST COME AFTER ROUTES
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
