import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-5">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="d-grid gap-2 p-3 mx-auto" style={{ width: "450px" }}>
        <input type="email" placeholder="your@email.com" class="form-control" />
        <input type="password" placeholder="password" class="form-control" />
        <button class="btn btn-primary bg-indigo border-indigo mb-3">
          Login
        </button>
        <div className="text-center py-3 text-gray-500">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="underline text-indigo">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
}
