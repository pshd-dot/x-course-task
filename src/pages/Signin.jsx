import "../styles/gStyle.css";
import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UsernameContext } from "./UserNameContext";

import avatar from "./generalImages/user.png";

function Signin() {
  const [inputValue, setInputValue] = useState("");
  const { username, setUsername, login } = useContext(UsernameContext);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const newUsername = inputValue;
    login(newUsername);
  };

  const isDisabled = inputValue.length < 4 || inputValue.length > 16;
  return (
    <div className="App">
      <main>
        <div className="context">
          <div className="title">
            <h3 className="title">Sign in Film Store</h3>
          </div>
          <img src={avatar} className="userImg" width="160px" />
          <section className="globalForm">
            <form action="/something" method="post">
              <div className="signin-div">
                <label htmlFor="username">Log in</label>
                <div className="div-input">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={inputValue}
                    onChange={handleChange}
                  />
                </div>
                <Link to="/filmlist">
                  <button
                    type="submit"
                    className="signinB"
                    disabled={isDisabled}
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Signin;
