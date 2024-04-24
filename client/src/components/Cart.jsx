import axios from "axios";

export default function Cart({ cart, setCart, id }) {
  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  function handleOrder() {
    axios.defaults.withCredentials = true;

    console.log(id);

    axios
      .post("http://localhost:3001/orders", {
        books: cart,
        user: id,
      })
      .then((res) => {
        console.log(res);
        setCart([]);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header bg-cyan-light-xs">
        <h5 className="offcanvas-title text-cyan" id="offcanvasRightLabel">
          Your Cart
        </h5>
        <button
          type="button"
          className="btn-close "
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <p>No books in your cart.</p>
        ) : (
          <>
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
                {cart.map((book, i) => {
                  return <CartBook book={book} i={i} setCart={setCart} />;
                })}{" "}
              </tbody>
            </table>
            <p className="text-cyan">Total price: {totalPrice}$</p>
            <button
              className="btn btn-primary bg-cyan border-cyan mb-3"
              onClick={handleOrder}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CartBook({ book, i, setCart }) {
  function decreaseQuantity() {
    if (book.quantity > 1) {
      book.quantity -= 1;
      setCart((cart) => cart.filter((item) => item !== book));
      setCart((cart) =>
        [...cart, book].sort((a, b) => a.title.localeCompare(b.title))
      );
    } else {
      setCart((cart) => cart.filter((item) => item !== book));
    }
  }

  function increaseQuantity() {
    book.quantity += 1;
    setCart((cart) => cart.filter((item) => item !== book));
    setCart((cart) =>
      [...cart, book].sort((a, b) => a.title.localeCompare(b.title))
    );
  }

  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>{book.title}</td>
      <td>{book.price}$</td>
      <td>
        <button className="quantity-button" onClick={decreaseQuantity}>
          -
        </button>
        {book.quantity}
        <button className="quantity-button" onClick={increaseQuantity}>
          +
        </button>
      </td>
    </tr>
  );
}
