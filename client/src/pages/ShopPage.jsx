import { useState, useEffect } from "react";
import axios from "axios";

export default function ShopPage({ setCart }) {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSort(e) {
    setSortBy(e.target.value);

    axios
      .get(`http://localhost:3001/books?${e.target.value}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleTitle(e) {
    setTitle(e.target.value);

    axios
      .get(`http://localhost:3001/books?title=${e.target.value}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleGenre(e) {
    setGenre(e.target.value);

    axios
      .get(`http://localhost:3001/books?genre=${e.target.value}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container text-center mt-4">
      <div className="row mb-4 gap-1 justify-content-start">
        <div className="col-3">
          <select
            value={sortBy}
            className="form-select input-cyan"
            onChange={(e) => handleSort(e)}
          >
            <option value="">Sort by...</option>
            <option value="sorted=title&order=ascending">
              Title from A to Z
            </option>
            <option value="sorted=title&order=descending">
              Title from Z to A
            </option>
            <option value="sorted=price&order=ascending">
              Price from low to high
            </option>
            <option value="sorted=price&order=descending">
              Price from high to low
            </option>
          </select>
        </div>
        <div className="col-3">
          <select
            value={genre}
            onChange={(e) => handleGenre(e)}
            className="form-select input-cyan"
          >
            <option value="">All genres</option>
            <option value="Classic">Classic</option>
            <option value="Fiction">Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Science Fiction">Science Fiction</option>
          </select>
        </div>
        <div className="col-3">
          <input
            value={title}
            type="text"
            placeholder="Title"
            className="form-control input-cyan"
            onChange={(e) => handleTitle(e)}
          />
        </div>

        <div className="col-auto text-cyan pt-2">
          Found {books.length} books.
        </div>
      </div>
      <div className="row row-cols-xxl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
        {books.map((book) => (
          <BookTile book={book} key={book.title} setCart={setCart} />
        ))}
      </div>
    </div>
  );
}

function BookTile({ book, setCart }) {
  function handleClick() {
    setCart((cart) => {
      book.quantity = 1;
      const newCart = [...cart, book].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return newCart;
    });
  }

  return (
    <div className="col mb-3">
      <div className="bookTile">
        <p className="mb-0 fs-6">{book.genre}</p>
        <div
          style={{
            backgroundImage: `url(${book.imageURL})`,
            width: "180px",
            height: "260px",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="d-grid">
          <p className="mb-0 text-cyan">{book.author.name}</p>
          <p className="mb-0 fs-5">{book.title}</p>
          <p className="mb-0 fs-6 text-cyan">{book.price}$</p>
        </div>
        <div className="row justify-content-between">
          <button
            className="col fs-6 text-cyan link-button"
            onClick={handleClick}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
