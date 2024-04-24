import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout({ setRole, setId, setCart }) {
  const navigate = useNavigate();
  localStorage.setItem("items", null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/logout")
      .then((res) => {
        console.log(res);
        if (res.data.logout) {
          setRole("");
          setId("");
          setCart([]);
          localStorage.removeItem("items");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  });
}
