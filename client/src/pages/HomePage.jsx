import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="row justify-content-center mt-5 gap-2">
      <div
        className="col-9 col-md-6 home-page-img"
        style={{ backgroundImage: 'url("book1.jpg")' }}
      ></div>
      <h1 className="col-9 col-md-3 big-text">
        Find Your Next{" "}
        <span className="text-cyan huge-text">Favorite Story</span> Here!
        <br />
        <Link to="/shop">
          <button className="btn btn-lg mt-4 btn-primary bg-cyan border-cyan">
            Shop now!
          </button>
        </Link>
      </h1>
    </div>
  );
}
