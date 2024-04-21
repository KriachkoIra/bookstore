import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}

  return (
    <div className="mt-5">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="d-grid gap-2 p-3 mx-auto" style={{ width: "450px" }}>
        <input
          type="email"
          placeholder="your@email.com"
          class="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          class="btn btn-primary bg-cyan border-cyan mb-3"
          type="submit"
          onClick={handleSubmit}
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
