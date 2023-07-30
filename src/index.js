import React from "react";
import ReactDOM from "react-dom/client"; // Исправлено: добавлен правильный импорт
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { UsernameProvider } from "./pages/UserNameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <UsernameProvider>
      <App />
    </UsernameProvider>
  </HashRouter>
);
