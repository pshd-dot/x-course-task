import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsernameContext } from "./UserNameContext";

import "../styles/listOfFilms.css";

const FilmList = () => {
  const { isAuthenticated, fetchData, films, isLoaded, error } =
    useContext(UsernameContext);
  const [value, setValue] = useState("");
  const [priceFilter, setPriceFilter] = useState("All");

  const navigate = useNavigate();

  const handleChangeText = (event) => {
    setValue(event.target.value);
  };

  const filteredFilms = useMemo(() => {
    if (!Array.isArray(films)) {
      return [];
    }
    return films?.filter((film) => {
      const isMatchingTitle = film.title
        .toLowerCase()
        .includes(value.toLowerCase());

      if (priceFilter === "all") {
        return isMatchingTitle;
      } else if (priceFilter === "less than 15$") {
        return isMatchingTitle && film.price <= 15;
      } else if (priceFilter === "more than 15$ and less then 30$") {
        return isMatchingTitle && film.price >= 15 && film.price <= 30;
      } else if (priceFilter === "more than 30$") {
        return isMatchingTitle && film.price >= 30;
      }
      return isMatchingTitle;
    });
  }, [films, priceFilter, value]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewButtonClick = (filmId) => {
    navigate(`./${filmId}`);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ position: "absolute", top: "50%", left: "20%" }}>
        <h1 style={{ alignItems: "center", justifyContent: "center" }}>
          To have access for movies please<Link to='/'> log in</Link>
        </h1>
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div>
          <div className='searchedInputDiv'>
            <input
              type='text'
              className='searchedInput'
              value={value}
              onChange={handleChangeText}
            />

            {/* <label htmlFor="priceFilter">Filtering bu cost</label> */}
            <select
              id='priceFilter'
              value={priceFilter}
              onChange={(event) => setPriceFilter(event.target.value)}
            >
              <option value='All'>All</option>
              <option value='less than 15$'>Less than 15$</option>
              <option value='more than 15$ and less then 30$'>
                More than 15$ and less then 30$
              </option>
              <option value='more than 30$'>More than 30$</option>
            </select>
          </div>
          <main>
            <div id='globalContainer' className='globalContainer'>
              <div className='container' id='mainContainer'>
                {filteredFilms.map((film) => (
                  <div key={film.id} className='film_container'>
                    <img
                      src={`${film.imagePoster}`}
                      alt='Film'
                      className='film'
                    />

                    <h2 className='text'>{film.title}</h2>

                    <p className='text'>{film.genre}</p>

                    <h3 className='text'>{film.price}</h3>
                    <button
                      onClick={() => handleViewButtonClick(film.id)}
                      className='viewButton'
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default FilmList;
