import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Register</h1>
      <form className="d-grid gap-2 p-3 mx-auto" style={{ width: "450px" }}>
        <input type="text" placeholder="Your Name" class="form-control" />
        <input type="email" placeholder="your@email.com" class="form-control" />
        <input type="password" placeholder="password" class="form-control" />
        <button class="btn btn-primary bg-cyan border-cyan mb-3">
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
