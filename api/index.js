import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import createAdmin from "./controllers/admin.controller.js";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/bookshopDB")
  .then(() => console.log("database connected"))
  .catch((err) => console.error("error connecting to database:", err));

app.get("/", (req, res) => {
  res.json("test ok.");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

createAdmin();
