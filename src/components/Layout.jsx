import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

import "../styles/gStyle.css";

const Layout = () => {
  const [username, setUsername] = useState("");
  return (
    <>
      <Header username={username} />
      <Outlet />
      <footer>
        <p>
          Виконано в{" "}
          <a href="https://prometheus.org.ua/" target="_blank">
            Prometheus
          </a>{" "}
          © 2022
        </p>
      </footer>
    </>
  );
};

export default Layout;
