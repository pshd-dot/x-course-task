import React, { useEffect, useContext } from "react";
import { UsernameContext } from "./UserNameContext";
import { Link } from "react-router-dom";

import "../styles/basket.css";

const Basket = () => {
  const {
    cartItems,
    removeFromCart,
    isAuthenticated,
    filmCount,
    totalPrice,
    setTotalPrice,
  } = useContext(UsernameContext);

  const calculateTotalPrice = () => {
    let total = 0;
    for (const filmTitle in cartItems) {
      total += cartItems[filmTitle].price * cartItems[filmTitle].quantity;
    }
    return total;
  };
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const roundedTotalPrice = totalPrice.toFixed(2);
  const cartIsEmpty = Object.keys(cartItems).length === 0;
  if (!isAuthenticated) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "20%",
          textDecoration: "none",
        }}
      >
        <h1 style={{ alignItems: "center" }}>
          To access the movie catalog, please <Link to="/">log in</Link> to your
          account
          <br />
        </h1>
      </div>
    );
  }
  const handleRemoveFromCart = (filmId, filmTitle) => {
    removeFromCart(filmId, filmTitle);
  };
  {
    console.log(filmCount);
  }
  return (
    <div className="cart">
      {cartIsEmpty ? (
        <div>
          <h2 style={{ color: "white " }}>Cart is empty</h2>
        </div>
      ) : (
        <div className="items-container">
          {Object.keys(cartItems).map((filmTitle) => (
            <div key={filmTitle} className="items">
              <div className="filmInfo">
                <p className="filmTitle">{filmTitle}</p>
                <p className="filmCount">{cartItems[filmTitle].quantity}</p>
                {console.log(cartItems)}
              </div>
              <div className="filmAnotherInfo">
                <p>
                  Price:{" "}
                  {cartItems[filmTitle].price * cartItems[filmTitle].quantity ||
                    0}
                </p>
                <button
                  onClick={() =>
                    handleRemoveFromCart(cartItems[filmTitle].id, filmTitle)
                  }
                  className="deleteButton"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <p>Total price: {roundedTotalPrice}$</p>
        </div>
      )}
    </div>
  );
};

export default Basket;
