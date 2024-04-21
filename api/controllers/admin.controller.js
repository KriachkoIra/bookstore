import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const createAdmin = async () => {
  try {
    const adminCount = await Admin.findOne();

    if (adminCount === null) {
      const hashedPassword = await bcrypt.hash("adminpassword", 10);

      const admin = new Admin({
        email: "admin@gmail.com",
        password: hashedPassword,
      });

      await admin.save();
      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }
  } catch (err) {
    console.error(err);
  }
};

export default createAdmin;
