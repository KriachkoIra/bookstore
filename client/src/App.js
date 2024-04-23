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
import AddBookPage from "./pages/AddBookPage";
import DeleteBook from "./pages/DeleteBook";
import EditBookPage from "./pages/EditBookPage";
import Cart from "./components/Cart";

function App() {
  const [role, setRole] = useState("");
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("items");
    if (localCart === null) return [];
    return JSON.parse(localCart);
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cart));
  }, [cart]);

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
      <Navbar role={role} cart={cart} />
      <Cart cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setRole={setRole} />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage setCart={setCart} />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/addBook" element={<AddBookPage />} />
        <Route path="/editBook/:id" element={<EditBookPage />} />
        <Route path="/deleteBook/:id" element={<DeleteBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
