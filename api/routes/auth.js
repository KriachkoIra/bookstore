import express from "express";
import jwt from "jsonwebtoken";
import { login as logAdmin } from "../controllers/admin.controller.js";
import { login as logUser, register } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email } = req.body;

  if (email === "admin@gmail.com") {
    return logAdmin(req, res);
  } else {
    logUser(req, res);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ logout: true });
});

router.post("/register", register);

router.get("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "No token." });
  } else {
    jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token." });
      } else {
        return res.status(200).json({ verified: true, role: decoded.role });
      }
    });
  }
});

export default router;
