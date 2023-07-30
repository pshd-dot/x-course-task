import React, { useState, useContext } from "react";
import basketImage from "../assets/basket.png";
import { Link } from "react-router-dom";
import { UsernameContext } from "../pages/UserNameContext";

const Header = () => {
  const { username, logout } = useContext(UsernameContext);

  const handleSignout = () => {
    logout();
  };

  return (
    <header>
      <div className="brand">
        <h1>Film Store / Pavlo Zhdanov</h1>
      </div>
      <div className="basketNOutNUser">
        <Link to="/basket">
          <img src={basketImage} alt="Basket" className="basketImage" />
        </Link>
        <div>
          <Link to="/signin">
            <button
              style={{ height: "100%" }}
              className="signoutB"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </Link>
        </div>
        <div className="usernameHeader">
          <h4>{username}</h4>
        </div>
      </div>
    </header>
  );
};

export default Header;
