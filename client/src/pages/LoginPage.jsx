import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/auth/login", { email, password })
      .then((res) => {
        console.log(res);
        if (res.data.login && res.data.role === "admin") {
          setRole("admin");
          navigate("/books");
        } else if (res.data.login) {
          setRole("user");
          navigate("/shop");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="mt-5">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="d-grid gap-2 p-3 mx-auto" style={{ width: "450px" }}>
        <input
          type="email"
          placeholder="your@email.com"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="btn btn-primary bg-cyan border-cyan mb-3"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
        <div className="text-center py-3 text-gray-500">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="underline text-cyan">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
}
