import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com") {
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
      process.env.ADMIN_KEY
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.status(200).json({ login: true, role: "admin" });
  } else {
  }
});

export default router;
