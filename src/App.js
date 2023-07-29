import { Routes, Route } from "react-router-dom";
import React from "react";

import Basket from "./pages/Basket";
import FilmList from "./pages/FilmList";
import SpecificFilm from "./pages/SpecificFilm";
import Layout from "./components/Layout";
import Pagenotfound from "./pages/Pagenotfound";
import Signin from "./pages/Signin";
import { UsernameProvider } from "./pages/UserNameContext";

function App() {
  return (
    <UsernameProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Signin />} />
          <Route path="filmlist" element={<FilmList />} />
          <Route path="basket" element={<Basket />} />
          <Route
            path="filmlist/specificfilm/:filmId"
            element={<SpecificFilm />}
          />
          <Route path="*" element={<Pagenotfound />} />
        </Route>
      </Routes>
    </UsernameProvider>
  );
}

export default App;
