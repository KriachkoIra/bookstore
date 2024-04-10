import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar bg-light sticky-top py-2">
      <div className="container-fluid d-flex justify-content-around">
        <ul className="nav fs-5">
          <li className="nav-item">
            <Link className="nav-link text-indigo" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-indigo" to="/books">
              Shop
            </Link>
          </li>
        </ul>
        <div className="navbar-brand">
          <img
            src="logo.png"
            alt="Logo"
            height="30"
            className="d-inline-block align-text-top"
          />
        </div>
        <ul className="nav fs-5">
          <li className="nav-item">
            <Link className="nav-link text-indigo">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-indigo" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
