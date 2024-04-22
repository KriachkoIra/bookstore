import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "No token." });
  } else {
    jwt.verify(token, process.env.ADMIN_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token." });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

export { verify };
