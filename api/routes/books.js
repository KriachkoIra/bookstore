import express from "express";
import Book from "../models/Book.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const books = await Book.find().filterAndSort(req);
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(verify, async (req, res) => {
    try {
      const book = await Book.addBook(req);
      res.status(201).json(book);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(verify, async (req, res) => {
    try {
      await Book.deleteMany({});
      res.status(204).json({ message: "Successfully deleted all books." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router
  .route("/:id")
  .get(getBook, async (req, res) => {
    res.json(res.book);
  })
  .patch(verify, getBook, async (req, res) => {
    try {
      const updatedBook = await res.book.update(req);
      res.json(updatedBook);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(verify, getBook, async (req, res) => {
    try {
      await Book.deleteOne(res.book);
      res.json({ message: "Successfully deleted." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

async function getBook(req, res, next) {
  let book;

  try {
    book = await Book.findById(req.params.id).populate("author");
    if (book == null) {
      return res.status(404).json({ message: "Couldn't find book." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

export default router;
