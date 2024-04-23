import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/auth/register", { name, email, password })
      .then((res) => {
        console.log(res);
        if (res.data.registered) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setAlert(err.response.data.message);
        console.log(err);
      });
  }

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Register</h1>
      <form className="d-grid gap-2 p-3 mx-auto" style={{ width: "450px" }}>
        <input
          type="text"
          placeholder="Your Name"
          class="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="your@email.com"
          class="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {alert && (
          <div class="alert alert-danger" role="alert">
            {alert}
          </div>
        )}
        <button
          class="btn btn-primary bg-cyan border-cyan mb-3"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </button>
        <div className="text-center py-3 text-gray-500">
          <span>Alredy registered? </span>
          <Link to="/login" className="underline text-cyan">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
