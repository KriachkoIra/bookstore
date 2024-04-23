import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/books", {
        title,
        author,
        genre,
        price,
        imageURL,
      })
      .then((res) => {
        console.log(res);
        navigate("/books");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Add book</h1>
      <form className="d-grid gap-3 p-3 mx-auto" style={{ width: "500px" }}>
        <input
          type="text"
          placeholder="Title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="form-select"
        >
          <option value="">Select a genre...</option>
          <option value="Classic">Classic</option>
          <option value="Fiction">Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            placeholder="Price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <textarea
          type="text"
          placeholder="Image URL"
          className="form-control"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          required
        />
        <button
          className="btn btn-primary bg-cyan border-cyan mb-3"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Add
        </button>
      </form>
    </div>
  );
}
