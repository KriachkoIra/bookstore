import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "Email alredy exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ registered: true, role: "user" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found." });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ message: "Password is incorrect." });
    }

    const token = jwt.sign(
      { role: "user", username: user.name },
      process.env.AUTH_KEY
    );

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("id", user._id, { httpOnly: true, secure: true });
    return res.status(200).json({ login: true, role: "user", id: user._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

export { register, login };
