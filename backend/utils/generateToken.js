import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  // Set cookie with explicit settings for cross-origin
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // Set to false for development (HTTP)
    sameSite: "lax", // Use 'lax' instead of 'strict' for cross-origin
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/",
    domain: "localhost", // Explicitly set domain
  });

  console.log("✅ Token cookie set in response");
  return token;
};

export default generateToken;
