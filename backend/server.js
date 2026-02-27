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
const port = process.env.PORT || 5000;

// DB Connection
connectDB();

// CORS configuration - ONLY ONCE with proper settings
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  }),
);

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());

// Routes
app.use("/api/products", router.productRouter);
app.use("/api/users", router.authRouter); // Make sure this matches your export
app.use("/api/orders", router.orderRoutes);

// Error middleware - THESE MUST COME AFTER ROUTES
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
