import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout({ setRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/logout")
      .then((res) => {
        console.log(res);
        if (res.data.logout) {
          setRole("");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  });
}
