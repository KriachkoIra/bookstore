import mongoose from "mongoose";
import Author from "./Author.js";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: String,
});

bookSchema.query.filterAndSort = async function (req) {
  let sortBy = req.query.sorted;
  const order = req.query.order === "descending" ? -1 : 1;
  if (sortBy !== "title" && sortBy !== "genre" && sortBy !== "price") {
    sortBy = null;
  }

  const genre = req.query.genre?.toLowerCase();
  const title = req.query.title?.toLowerCase();
  let authors;

  if (req.query.author) {
    authors = await Author.find({
      name: { $regex: new RegExp(req.query.author, "i") },
    });
  }

  authors = authors?.map((a) => a._id);

  const query = {};
  if (authors) query.author = { $in: authors };
  if (genre) query.genre = { $regex: new RegExp(genre, "i") };
  if (title) query.title = { $regex: new RegExp(title, "i") };

  try {
    return this.find(query)
      .populate("author")
      .sort({
        [sortBy]: order,
      });
  } catch (err) {
    throw err;
  }
};

bookSchema.static("addBook", async function addBook(req) {
  try {
    const author = await Author.findOne({
      name: new RegExp(`^${req.body.author}$`, "i"),
    });

    let newAuthor;

    if (!author) {
      const author = new Author({ name: req.body.author });
      newAuthor = await author.save();
    }

    const book = {
      title: req.body.title,
      genre: req.body.genre,
      author: author?._id || newAuthor?._id,
      price: req.body.price,
      imageURL: req.body.imageURL,
    };

    return this.create(book);
  } catch (err) {
    throw err;
  }
});

bookSchema.method("update", async function update(req) {
  this.title = req.body.title || this.title;
  this.genre = req.body.genre || this.genre;
  this.author = req.body.author || this.author;
  this.price = req.body.price || this.price;
  this.imageURL = req.body.imageURL || this.imageURL;

  if (req.body.author) {
    const author = await Author.findOne({
      name: new RegExp(`^${req.body.author}$`, "i"),
    });

    let newAuthor;

    if (!author) {
      const author = new Author({ name: req.body.author });
      newAuthor = await author.save();
    }

    this.author = author?._id || newAuthor?._id;
  }

  try {
    return this.save();
  } catch (err) {
    throw err;
  }
});

const Book = new mongoose.model("Book", bookSchema);

export default Book;
