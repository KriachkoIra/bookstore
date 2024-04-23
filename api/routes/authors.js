import express from "express";
import Author from "../models/Author.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const authors = await Author.find();
      res.json(authors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const author = await Author.addAuthor(req);
      res.status(201).json(author);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Author.deleteMany({});
      res.status(204).json({ message: "Successfully deleted all authors." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router
  .route("/:id")
  .get(getAuthor, async (req, res) => {
    res.json(res.author);
  })
  .patch(getAuthor, async (req, res) => {
    try {
      const updatedAuthor = await res.author.update(req);
      res.json(updatedAuthor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(getAuthor, async (req, res) => {
    try {
      await Author.deleteOne(res.author);
      res.json({ message: "Successfully deleted." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

async function getAuthor(req, res, next) {
  let author;

  try {
    author = await Author.findById(req.params.id);
    if (author == null) {
      return res.status(404).json({ message: "Couldn't find author." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.author = author;
  next();
}

export default router;
