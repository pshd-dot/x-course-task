import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Basket from "./pages/Basket";
import FilmList from "./pages/FilmList";
import SpecificFilm from "./pages/SpecificFilm";
import Pagenotfound from "./pages/Pagenotfound";
import Signin from "./pages/Signin";
import { PrivateRoutes } from "./utils/PrivetRoute";
import Header from "./components/Header"

function App() {
  return (
		<>
		<Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Navigate to='/filmlist' replace />} />

          <Route path='/filmlist'>
            <Route index element={<FilmList />} />
            <Route path=':filmId' element={<SpecificFilm />} />
          </Route>

          <Route path='basket' element={<Basket />} />
					
          <Route path='*' element={<Pagenotfound />} />
        </Route>
        <Route path='/signin' element={<Signin />} />
      </Routes>
			</>
  );
}

export default App;
