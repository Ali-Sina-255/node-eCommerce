import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const fixIndexes = async () => {
  try {
    // Get the collection
    const collection = User.collection;

    // Get all indexes
    const indexes = await collection.indexes();
    console.log("Current indexes:".yellow);
    console.log(indexes);

    // Find and drop the isAdmin index if it exists
    for (const index of indexes) {
      if (index.name === "isAdmin_1") {
        console.log(`Dropping index: ${index.name}`.red);
        await collection.dropIndex("isAdmin_1");
        console.log(`Index ${index.name} dropped successfully`.green);
      }
    }

    // Ensure only email has unique index
    await collection.createIndex({ email: 1 }, { unique: true });
    console.log("Email unique index ensured".green);

    // Get updated indexes
    const updatedIndexes = await collection.indexes();
    console.log("Updated indexes:".green);
    console.log(updatedIndexes);

    console.log("Indexes fixed successfully!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

fixIndexes();
