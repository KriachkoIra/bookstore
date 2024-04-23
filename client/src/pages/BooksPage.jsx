import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        console.log(res);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="container text-center mt-4">
      <div className="row row-cols-xxl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
        {books.map((book) => (
          <BookTile book={book} key={book.title} />
        ))}
      </div>
    </div>
  );
}

function BookTile({ book }) {
  return (
    <div className="col mb-3">
      <div className="bookTile">
        <p className="mb-0 text-cyan">{book.genre}</p>
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
          <Link
            className="col fs-6 text-cyan link-button"
            to={`/editBook/${book._id}`}
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </Link>
          <Link
            className="col fs-6 text-cyan link-button"
            to={`/deleteBook/${book._id}`}
          >
            <i class="fa-solid fa-trash"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
