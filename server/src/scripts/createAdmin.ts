import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import bcrypt from "bcryptjs";

dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI!);
  const hashed = await bcrypt.hash("admin123", 10);
  await User.create({ firstName: 'Waheed', lastName:'Ahmed',email: "admin@admin.com", password: hashed });
  console.log("Admin created");
  process.exit();
}

createAdmin();
