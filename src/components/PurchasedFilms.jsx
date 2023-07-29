import React from "react";

const PurchasedFilms = (props) => {
  return (
    <div className="items">
      <div className="item">
        <div className="properties">
          <p>{props.filmName}</p>
          <p>{props.filmCount}</p>
        </div>
        <div className="cost">
          <p>{props.filmPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default PurchasedFilms;
