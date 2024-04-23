import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function DeleteBook() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .delete(`http://localhost:3001/books/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/books");
      })
      .catch((err) => console.log(err));
  });
}
