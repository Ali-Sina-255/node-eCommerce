import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc  Auth User
// @route GET /api/users/token
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  res.send("auth");
});

// @desc  Register User
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  res.send("register User");
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
  res.send("update User Profile"); // Fixed: was "logout User"
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
