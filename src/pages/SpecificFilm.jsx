import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UsernameContext } from "./UserNameContext";
import "../styles/specificFilm.css";

import harryPotterImage from "./generalImages/harrypotter.jpg";
import spidermanImage from "./generalImages/spiderman.jpg";
import pandaImage from "./generalImages/panda.jpg";
import fastNFuriousImage from "./generalImages/fastNFurious9.jpg";

import harryPotterImageTitle from "./generalImages/harrypotter_title.jpg";
import spidermanImageTitle from "./generalImages/spiderman_title.png";
import pandaImageTitle from "./generalImages/panda_title.png";
import fastNFurious9ImageTitle from "./generalImages/fastNFurious9_title.jpg";

const imageMapping = {
  "./generalImages/harrypotter.jpg": harryPotterImage,
  "./generalImages/spiderman.jpg": spidermanImage,
  "./generalImages/panda.jpg": pandaImage,
  "./generalImages/fastNFurious9.jpg": fastNFuriousImage,
};

const imageTitleMapping = {
  "./generalImages/harrypotter_title.jpg": harryPotterImageTitle,
  "./generalImages/spiderman_title.png": spidermanImageTitle,
  "./generalImages/panda_title.png": pandaImageTitle,
  "./generalImages/fastNFurious9_title.jpg": fastNFurious9ImageTitle,
};

const SpecificFilm = () => {
  const {
    isAuthenticated,
    addToCart,
    error,
    isLoaded,
    films,
    filmCount,

    handleFilmCount,
  } = useContext(UsernameContext);

  const { filmId } = useParams();

  const selectedFilm = films.find((film) => film.id === Number(filmId));

  // const imageSource = imageMapping[selectedFilm.imagePoster];
  const imageSource = selectedFilm ? imageMapping[selectedFilm.image] : null;
  const imageTitleSource = selectedFilm
    ? imageTitleMapping[selectedFilm.imageTitle]
    : null;

  if (!isAuthenticated) {
    return (
      <div style={{ position: "absolute", top: "50%", left: "20%" }}>
        <h1 style={{ alignItems: "center" }}>
          To access the movie catalog please <Link to="/">login</Link>
        </h1>
      </div>
    );
  }
  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading..</p>;
  } else if (!selectedFilm) {
    return (
      <div
        style={{
          margin: "0",
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>
          <b>Film not found</b>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <main>
          <div className="imageOpacity">
            <img
              src={imageSource}
              alt="Film Image"
              className="image"
              width="100%"
            />
            <img
              src={imageTitleSource}
              className="overlay-imgTitle"
              style={{ width: "350px" }}
            />
            <div className="overlay-title">
              <h3>{selectedFilm.title}</h3>
            </div>
            <div className="overlay-mainDescription">
              <h4>
                {selectedFilm.year} | {selectedFilm.age} |{" "}
                {selectedFilm.duration}
              </h4>
            </div>
            <div className="overlay-description">
              <p>{selectedFilm.description}</p>
            </div>
            <div className="mainActors">
              <p>
                Main actors: <b>{selectedFilm.actors}</b>
              </p>
            </div>
            <div className="line"></div>
          </div>
        </main>
        <div className="container"></div>
        <div className="section">
          <div className="buy">
            <div className="test">
              <div className="f_count">
                <b>Count </b>
                <select onChange={handleFilmCount}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="f_totalPrice">
                <b>Total price </b>
                {selectedFilm.price * filmCount}$
              </div>
              <div className="f_button">
                {" "}
                <button
                  className="addToCart"
                  type="submit"
                  onClick={() => addToCart(selectedFilm, filmCount)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SpecificFilm;
