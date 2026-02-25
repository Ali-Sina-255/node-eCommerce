import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc  Auth User
// @route POST /api/users/token
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.isMatchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
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
  const { name, email, password } = req.body;
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ success: true, data: user });
  } else {
    res.status(400);
    throw new Error("Invalid User id");
  }
});

// @desc  Logout User /clear cookies
// @route POST /api/users/logout
// @access private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "none", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "Logout successfully!" });
});

// @desc get User Profile
// @route GET /api/users/profile
// @access public
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc update User Profile
// @route PUT /api/users/profile
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User Not found");
  }
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
