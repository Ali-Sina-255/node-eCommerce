import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// routers
import router from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// DB Connection
connectDB();

// express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());
app.use("/api/products", router.productRouter);
app.use("/api/users", router.authRouter);

// Error middleware - THESE MUST COME AFTER ROUTES
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
