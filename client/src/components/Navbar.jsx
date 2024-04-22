import { Link } from "react-router-dom";

export default function Navbar({ role }) {
  return (
    <nav className="navbar bg-light sticky-top py-2">
      <div className="container-fluid d-flex justify-content-around">
        <ul className="nav fs-5">
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
        <div className="navbar-brand text-center">
          <img
            src="logo1.png"
            alt="Logo"
            height="30"
            className="d-inline-block align-text-top"
          />
        </div>
        <ul className="nav fs-5 text-right">
          {role === "admin" && (
            <>
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
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link text-cyan">Cart</Link>
          </li>
          <li className="nav-item">
            {role ? (
              <Link className="nav-link text-cyan" to="/logout">
                Logout
              </Link>
            ) : (
              <Link className="nav-link text-cyan" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
