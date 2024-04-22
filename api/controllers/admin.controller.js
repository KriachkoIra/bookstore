import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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

const login = async (req, res) => {
  try {
    const { password } = req.body;

    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "No admins found." });
    }

    const passwordIsValid = await bcrypt.compare(password, admin.password);
    if (!passwordIsValid) {
      return res.status(404).json({ message: "Password is incorrect." });
    }

    const token = jwt.sign(
      { role: "admin", username: "admin" },
      process.env.AUTH_KEY
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.status(200).json({ login: true, role: "admin" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

export { createAdmin, login };
