import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthYear: Number,
  deathYear: Number,
});

authorSchema.static("addAuthor", async function addAuthor(req) {
  try {
    const author = {
      name: req.body.name,
      birthYear: req.body.birthYear,
      deathYear: req.body.deathYear,
    };

    return this.create(author);
  } catch (err) {
    throw err;
  }
});

authorSchema.method("update", async function update(req) {
  this.name = req.body.name || this.name;
  this.birthYear = req.body.birthYear || this.birthYear;
  this.deathYear = req.body.deathYear || this.deathYear;

  try {
    return this.save();
  } catch (err) {
    throw err;
  }
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
