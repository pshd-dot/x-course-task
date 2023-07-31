import React from "react";
import { Link } from "react-router-dom";
import "../styles/pageNotFound.css";

const Pagenotfound = () => {
  return (
    <div className="pageNotFound">
      <div className="textStopper">
        <h3>
          Oops, something went wrong. 404 error.{" "}
          <Link to={"/filmlist"}>Go to start</Link>
        </h3>
      </div>
    </div>
  );
};

export default Pagenotfound;
