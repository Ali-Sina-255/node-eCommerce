import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
  { timestamps: true },
);

// match user password entered to hashed password
userSchema.methods.isMatchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model("User", userSchema);

export default User;
