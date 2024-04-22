import express from "express";
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

router.post("/register", register);

export default router;
