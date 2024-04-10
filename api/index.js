import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json("test ok.");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
