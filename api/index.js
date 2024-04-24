import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createAdmin } from "./controllers/admin.controller.js";
import AuthRouter from "./routes/auth.js";
import booksRouter from "./routes/books.js";
import authorsRouter from "./routes/authors.js";
import testRouter from "./routes/test.js";
import ordersRouter from "./routes/order.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/bookshopDB")
  .then(() => console.log("database connected"))
  .catch((err) => console.error("error connecting to database:", err));

app.use("/auth", AuthRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/orders", ordersRouter);
app.use("/test", testRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

createAdmin();
