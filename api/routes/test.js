import express from "express";
import Book from "../models/Book.js";
import Author from "../models/Author.js";

const router = express.Router();

router.route("/add-books").post(async (req, res) => {
  const harper = await Author.findOne({ name: "Harper Lee" });
  const orwell = await Author.findOne({ name: "George Orwell" });
  const fitzgerald = await Author.findOne({ name: "F. Scott Fitzgerald" });
  const salinger = await Author.findOne({ name: "J.D. Salinger" });

  const books = [
    {
      title: "To Kill a Mockingbird",
      author: harper?._id,
      genre: "Classic",
      price: 20.5,
      imageURL: "https://tinyurl.com/ynd8juuz",
    },
    {
      title: "1984",
      author: orwell?._id,
      genre: "Dystopian",
      price: 15.25,
      imageURL: "https://tinyurl.com/5dmya96r",
    },
    {
      title: "The Great Gatsby",
      author: fitzgerald?._id,
      genre: "Classic",
      price: 16,
      imageURL: "https://tinyurl.com/2csynky4",
    },
    {
      title: "The Catcher in the Rye",
      author: salinger?._id,
      genre: "Coming-of-age",
      price: 18.6,
      imageURL: "https://tinyurl.com/52vrtvz5",
    },
  ];

  try {
    const resBooks = await Book.insertMany(books);
    res.json(resBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.route("/add-authors").post(async (req, res) => {
  const authors = [
    { name: "Harper Lee", birthYear: 1926, deathYear: 2016 },
    { name: "George Orwell", birthYear: 1903, deathYear: 1950 },
    { name: "F. Scott Fitzgerald", birthYear: 1896, deathYear: 1940 },
    { name: "J.D. Salinger", birthYear: 1919, deathYear: 2010 },
    { name: "Jane Austen", birthYear: 1775, deathYear: 1817 },
  ];

  try {
    const resAuthors = await Author.insertMany(authors);
    res.json(resAuthors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
