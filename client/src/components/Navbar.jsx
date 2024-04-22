import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar bg-light sticky-top py-2">
      <div className="container-fluid d-flex justify-content-around">
        <ul className="nav fs-5 col-3">
          <li className="nav-item">
            <Link className="nav-link text-cyan" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-cyan" to="/shop">
              Shop
            </Link>
          </li>
        </ul>
        <div className="navbar-brand text-center col-3">
          <img
            src="logo1.png"
            alt="Logo"
            height="30"
            className="d-inline-block align-text-top"
          />
        </div>
        <ul className="nav fs-5 col-3 text-right">
          <li className="nav-item">
            <Link className="nav-link text-cyan" to="/books">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-cyan" to="/addBook">
              Add book
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-cyan">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-cyan" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
