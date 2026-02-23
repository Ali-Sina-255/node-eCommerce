import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("1234567", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("1234567", 10),
    isAdmin: false,
  },
  {
    name: "Ali",
    email: "ali@gmail.com",
    password: bcrypt.hashSync("1234567", 10),
    isAdmin: true,
  },
  {
    name: "Test User",
    email: "test@example.com",
    password: bcrypt.hashSync("1234567", 10),
    isAdmin: false,
  },
];

export default users;
