import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BooksPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((res) => {
        console.log(res);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="container mt-4">
      <div className="row row-cols-3">
        {orders.map((order, i) => (
          <div className="order p-3">
            <h6>
              <strong>Order {i + 1}</strong>
            </h6>
            <p>
              <strong>User:</strong> {order.user.email}
            </p>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Book</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.books.map((book, i) => {
                  return <CartBook book={book} i={i} />;
                })}
              </tbody>
            </table>
            <p>
              <strong>Total price:</strong>{" "}
              {order.books.reduce(
                (acc, cur) => acc + cur.price * cur.quantity,
                0
              )}
              $
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartBook({ book, i }) {
  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>{book.title}</td>
      <td>{book.price}$</td>
      <td>{book.quantity}</td>
    </tr>
  );
}
