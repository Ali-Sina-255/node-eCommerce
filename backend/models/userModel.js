import mongoose from "mongoose";

import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
      validate: [
        validator.isStrongPassword,
        "Password must be at least 8 characters with uppercase, lowercase and symbol!",
      ],
    },
  },
  { timestamp: true },
);

const User = mongoose.model("User", userSchema);

export default User;
