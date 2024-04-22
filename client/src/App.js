import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import BooksPage from "./pages/BooksPage";
import Logout from "./pages/Logout";
import axios from "axios";

function App() {
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        console.log(res);
        if (res.data.verified) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setRole={setRole} />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
