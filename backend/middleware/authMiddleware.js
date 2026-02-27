import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  // Log all cookies for debugging
  console.log("All cookies received:", req.cookies);

  let token = req.cookies?.jwt;

  console.log("Token found in cookies:", token ? "Yes" : "No");

  if (!token) {
    // Also check Authorization header as fallback
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      console.log("Token found in Authorization header");
    }
  }

  if (!token) {
    console.log("No token found in cookies or headers");
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }

  try {
    console.log("Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      console.log("User not found for ID:", decoded.userId);
      res.status(401);
      throw new Error("User not found");
    }

    console.log("User authenticated:", req.user.email);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401);
    throw new Error("Not Authorized, Token Failed");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log("Admin access granted for:", req.user.email);
    next();
  } else {
    console.log("Admin access denied for:", req.user?.email);
    res.status(401);
    throw new Error("Not authorized as Admin");
  }
};

export { protect, admin };
