import React from "react";
import ReactDOM from "react-dom"; // Исправлено: добавлен правильный импорт
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
