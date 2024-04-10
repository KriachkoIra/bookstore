import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="row justify-content-center mt-5">
      <div
        className="col-9 col-md-6 home-page-img"
        style={{ backgroundImage: 'url("book.jpg")' }}
      ></div>
      <h1 className="col-9 col-md-3 big-text ms-md-2">
        Find Your Next{" "}
        <span className="text-indigo huge-text">Favorite Story</span> Here!
        <br />
        <Link to="/books">
          <button className="btn btn-lg mt-4 btn-primary bg-indigo border-indigo">
            Shop now!
          </button>
        </Link>
      </h1>
    </div>
  );
}
