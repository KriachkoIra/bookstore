import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const orders = await Order.find().populate("books").populate("user");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const user = await User.findById(req.body.user);

      const order = new Order({
        user: user._id,
        books: req.body.books,
      });

      await order.save();
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

export default router;
