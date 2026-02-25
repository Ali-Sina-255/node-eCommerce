import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// @desc  Auth User
// @route POST /api/users/token
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.isMatchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    // set jwt as http_Only cookies

    res.cookie("JWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

// @desc  Register User
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

// @desc  Logout User /clear cookies
// @route POST /api/users/logout
// @access private
export const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout User");
});

// @desc get User Profile
// @route GET /api/users/profile
// @access public
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get User Profile");
});

// @desc update User Profile
// @route PUT /api/users/profile
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update User Profile");
});

// @desc get all Users
// @route GET /api/users
// @access private/admin
export const getUsers = asyncHandler(async (req, res) => {
  res.send("get all Users");
});

// @desc get User by id
// @route GET /api/users/:id
// @access private/admin
export const getUserById = asyncHandler(async (req, res) => {
  res.send("get User by id");
});

// @desc delete User
// @route DELETE /api/users/:id
// @access private/admin
export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete User");
});

// @desc update User
// @route PUT /api/users/:id
// @access private/admin
export const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});
